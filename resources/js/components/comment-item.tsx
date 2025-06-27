import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useInitials } from '@/hooks/use-initials';
import { PostComment } from '@/types';
import { router } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock, Edit, EllipsisVertical, Trash, Check, X } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface CommentItemProps {
  comment: PostComment;
  onEdit?: (comment: PostComment) => void;
  onDelete?: (comment: PostComment) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function CommentItem({ comment, onEdit, onDelete, canEdit = false, canDelete = false }: CommentItemProps) {
  const initials = useInitials();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSave = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      handleCancel();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postId = comment.post_id || comment.post_id;
      
      if (!postId) {
        throw new Error('No se pudo encontrar el ID del post');
      }

      await router.put(`/announcements/${postId}/comments/${comment.id}`, {
        content: editContent.trim()
      }, {
        onFinish: () => {
          setIsSubmitting(false);
          setIsEditing(false);
        },
        onError: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage  /> {/* TODO: Add avatar */}
              <AvatarFallback className="bg-foreground p-1 text-background text-xs">
                {initials(comment.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{comment.user.name}</p>
                {comment.user.is_staff === true && (
                  <Badge variant="secondary" className="text-xs">
                    Staff
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(comment.created_at, { addSuffix: true })} - {format(comment.created_at, 'MMM d, yyyy h:mm a')}
                {comment.updated_at !== comment.created_at && (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
              </div>
            </div>
          </div>
          {(canEdit || canDelete) && !isEditing && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {canEdit && (
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {canDelete && (
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {isEditing && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={isSubmitting || !editContent.trim() || editContent === comment.content}
                className="h-8 w-8 p-0"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your comment..."
              className="min-h-[80px] resize-none"
              disabled={isSubmitting}
              autoFocus
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Press Cmd+Enter to save, Esc to cancel</span>
              <span className="text-right">
                {editContent.length}/255
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed">
            {comment.content}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 