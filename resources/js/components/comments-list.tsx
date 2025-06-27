import { PostComment } from '@/types';
import { CommentItem } from './comment-item';

interface CommentsListProps {
  comments: PostComment[];
  onEditComment?: (comment: PostComment) => void;
  onDeleteComment?: (comment: PostComment) => void;
  canEditComments?: boolean;
  canDeleteComments?: boolean;
}

export function CommentsList({ comments, onEditComment, onDeleteComment, canEditComments = false, canDeleteComments = false }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
          canEdit={canEditComments}
          canDelete={canDeleteComments}
        />
      ))}
    </div>
  );
}
