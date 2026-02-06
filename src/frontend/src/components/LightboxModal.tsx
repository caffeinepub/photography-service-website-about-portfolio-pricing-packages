import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface LightboxModalProps {
  image: {
    src: string;
    title: string;
    category: string;
  };
  onClose: () => void;
}

export function LightboxModal({ image, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 bg-background border border-border">
        <DialogClose className="absolute right-4 top-4 z-50 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none">
          <X className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="p-6">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
          <div className="mt-6 text-center">
            <h3 className="text-lg font-serif font-medium">{image.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{image.category}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
