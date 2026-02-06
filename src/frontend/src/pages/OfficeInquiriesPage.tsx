import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllInquiries, useGetCallerUserProfile, useSaveCallerUserProfile, useDeleteInquiry } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogOut, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import type { Inquiry } from '../backend';

export function OfficeInquiriesPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();
  const { data: inquiries, isLoading: inquiriesLoading, error: inquiriesError } = useGetAllInquiries();
  const deleteInquiryMutation = useDeleteInquiry();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) return;
    try {
      await saveProfileMutation.mutateAsync({ name: profileName.trim() });
      setShowProfileSetup(false);
      setProfileName('');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleDeleteInquiry = async (id: bigint) => {
    try {
      await deleteInquiryMutation.mutateAsync(id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseInquiryMessage = (message: string) => {
    const lines = message.split('\n');
    let eventType = '';
    let preferredDate = '';
    let actualMessage = '';

    if (lines[0]?.startsWith('Event Type:')) {
      eventType = lines[0].replace('Event Type:', '').trim();
    }
    if (lines[1]?.startsWith('Preferred Date:')) {
      preferredDate = lines[1].replace('Preferred Date:', '').trim();
    }
    actualMessage = lines.slice(3).join('\n').trim();

    return { eventType, preferredDate, actualMessage };
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(label);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const clientUrl = window.location.origin + window.location.pathname;
  const officeUrl = window.location.origin + window.location.pathname + '#/office';

  // Check if profile setup is needed
  if (isAuthenticated && !profileLoading && isFetched && userProfile === null && !showProfileSetup) {
    setShowProfileSetup(true);
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-border p-8 text-center">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">Office Inquiries</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Please log in to view and manage inquiries.
          </p>
          <Button
            onClick={handleLogin}
            disabled={loginStatus === 'logging-in'}
            className="w-full"
          >
            {loginStatus === 'logging-in' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login with Internet Identity'
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Profile setup dialog
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-border p-8">
          <h2 className="text-2xl font-serif font-medium text-foreground mb-4">Welcome!</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Please enter your name to complete your profile setup.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileName">Your Name</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={!profileName.trim() || saveProfileMutation.isPending}
              className="w-full"
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Access denied (not admin)
  if (inquiriesError) {
    const errorMessage = inquiriesError instanceof Error ? inquiriesError.message : 'Unknown error';
    if (errorMessage.includes('Unauthorized')) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full border border-border p-8 text-center">
            <h1 className="text-3xl font-serif font-medium text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8 text-sm">
              You do not have permission to view this page. Only administrators can access office inquiries.
            </p>
            <Button onClick={handleLogout} variant="ghost" className="border border-border">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      );
    }
  }

  // Main office page
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-medium text-foreground">Office Inquiries</h1>
            <div className="flex items-center gap-4">
              {userProfile && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {userProfile.name}
                </span>
              )}
              <Button onClick={handleLogout} variant="ghost" size="sm" className="border border-border">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Section */}
        <div className="mb-8 border border-border p-6">
          <h2 className="text-lg font-serif font-medium text-foreground mb-4">Access URLs</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Client website</p>
                <p className="text-sm text-foreground font-mono break-all">{clientUrl}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(clientUrl, 'client')}
                variant="ghost"
                size="sm"
                className="border border-border shrink-0"
              >
                {copiedUrl === 'client' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Office inquiries</p>
                <p className="text-sm text-foreground font-mono break-all">{officeUrl}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(officeUrl, 'office')}
                variant="ghost"
                size="sm"
                className="border border-border shrink-0"
              >
                {copiedUrl === 'office' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-serif font-medium text-foreground">
              All Inquiries ({inquiries?.length || 0})
            </h2>
          </div>

          {inquiriesLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-4">Loading inquiries...</p>
            </div>
          ) : !inquiries || inquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground text-sm">No inquiries yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Submitted</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry: Inquiry) => {
                    const { eventType, preferredDate, actualMessage } = parseInquiryMessage(inquiry.message);
                    return (
                      <TableRow key={inquiry.id.toString()}>
                        <TableCell className="text-xs">{formatTimestamp(inquiry.timestamp)}</TableCell>
                        <TableCell className="text-sm">{inquiry.name}</TableCell>
                        <TableCell className="text-sm">
                          <a href={`mailto:${inquiry.email}`} className="hover:underline">
                            {inquiry.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">
                          <a href={`tel:${inquiry.phone}`} className="hover:underline">
                            {inquiry.phone}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">{eventType}</TableCell>
                        <TableCell className="text-sm">{preferredDate}</TableCell>
                        <TableCell className="text-sm max-w-xs truncate">{actualMessage}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setDeleteConfirm(inquiry.id)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Inquiry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDeleteInquiry(deleteConfirm)}
              disabled={deleteInquiryMutation.isPending}
            >
              {deleteInquiryMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
