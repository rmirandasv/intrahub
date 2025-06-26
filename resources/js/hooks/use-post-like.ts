import { router } from '@inertiajs/react';
import { useState } from 'react';

interface UsePostLikeProps {
  postId: number;
  initialLikesCount: number;
  isLiked: boolean;
}

interface UsePostLikeReturn {
  likesCount: number;
  isLiked: boolean;
  isLoading: boolean;
  toggleLike: () => void;
}

export function usePostLike({ postId, initialLikesCount, isLiked: initialIsLiked }: UsePostLikeProps): UsePostLikeReturn {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = () => {
    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    
    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);
    setIsLoading(true);

    // Make the actual request
    router.post(route('posts.like.toggle', postId), {}, {
      preserveScroll: true,
      onError: () => {
        // Revert optimistic update on error
        setIsLiked(initialIsLiked);
        setLikesCount(initialLikesCount);
      },
      onFinish: () => {
        setIsLoading(false);
      },
    });
  };

  return {
    likesCount,
    isLiked,
    isLoading,
    toggleLike,
  };
} 