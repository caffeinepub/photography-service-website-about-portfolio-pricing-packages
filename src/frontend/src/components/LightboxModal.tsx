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
      <DialogContent className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-sm border-none">
        <DialogClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-6 w-6 text-foreground" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="p-4">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-serif font-semibold">{image.title}</h3>
            <p className="text-sm text-muted-foreground">{image.category}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
