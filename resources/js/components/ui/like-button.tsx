import { Button } from '@/components/ui/button';
import { usePostLike } from '@/hooks/use-post-like';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: number;
  initialLikesCount: number;
  isLiked: boolean;
  className?: string;
}

export function LikeButton({ postId, initialLikesCount, isLiked: initialIsLiked, className }: LikeButtonProps) {
  const { likesCount, isLiked, isLoading, toggleLike } = usePostLike({
    postId,
    initialLikesCount,
    isLiked: initialIsLiked,
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLike}
      disabled={isLoading}
      className={cn(
        'transition-colors',
        isLiked && 'text-red-600 hover:text-red-700',
        className
      )}
    >
      <Heart className={cn('mr-1 h-4 w-4', isLiked && 'fill-current')} />
      {likesCount}
    </Button>
  );
} 