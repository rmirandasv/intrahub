import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

interface CategoryDeleteModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryDeleteModal({ category, isOpen, onClose }: CategoryDeleteModalProps) {
  const handleDelete = () => {
    if (category) {
      router.delete(`/categories/${category.id}`, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete Category
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the category "{category?.name}"? This action cannot be undone.
            {category?.post_count && category.post_count > 0 && (
              <span className="mt-2 block text-sm text-amber-600">
                ⚠️ This category has {category.post_count} post{category.post_count !== 1 ? 's' : ''} associated with it.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
