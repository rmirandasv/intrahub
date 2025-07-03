import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/types';
import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';

interface EventDeleteModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDeleteModal({ event, isOpen, onClose }: EventDeleteModalProps) {
  const handleDelete = () => {
    if (!event) return;

    router.delete(`/events/${event.id}`, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash className="h-5 w-5 text-red-600" />
            Delete Event
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete "{event?.post.title}"? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={!event}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
