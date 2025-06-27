import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { PostComment } from '@/types';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock, Edit, EllipsisVertical, Trash } from 'lucide-react';
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

  const handleEdit = () => {
    if (onEdit) {
      onEdit(comment);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment);
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
              </div>
            </div>
          </div>
          {(canEdit || canDelete) && (
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
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm leading-relaxed">
          {comment.content}
        </div>
      </CardContent>
    </Card>
  );
} 