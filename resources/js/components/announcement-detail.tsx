import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LikeButton } from '@/components/ui/like-button';
import { ImageGallery } from '@/components/ui/image-gallery';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { Announcement, PostComment } from '@/types';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Link } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock, Edit, EllipsisVertical, MessageCircle, Share2, Trash } from 'lucide-react';
import { CommentForm } from './comment-form';
import { CommentsList } from './comments-list';
import '@blocknote/mantine/style.css';

interface AnnouncementDetailProps {
  announcement: Announcement;
  onDelete?: (announcement: Announcement) => void;
  onAddComment?: (content: string) => void;
  onEditComment?: (comment: PostComment) => void;
  onDeleteComment?: (comment: PostComment) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canEditComments?: boolean;
  canDeleteComments?: boolean;
  isLoadingComment?: boolean;
}

export function AnnouncementDetail({
  announcement,
  onDelete,
  onAddComment,
  onEditComment,
  onDeleteComment,
  canEdit = false,
  canDelete = false,
  canEditComments = false,
  canDeleteComments = false,
  isLoadingComment = false,
}: AnnouncementDetailProps) {
  const initials = useInitials();
  const { appearance } = useAppearance();
  const editor = useCreateBlockNote({
    initialContent: announcement.content ? JSON.parse(announcement.content) : [],
  });

  const handleDelete = () => {
    if (onDelete) {
      onDelete(announcement);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={announcement.user.avatar || '/placeholder.svg'} />
                <AvatarFallback className="bg-foreground p-1 text-background">{initials(announcement.user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{announcement.user.name}</p>
                  {announcement.user.is_staff === true && (
                    <Badge variant="secondary" className="text-xs">
                      Staff
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(announcement.created_at, { addSuffix: true })} - {format(announcement.created_at, 'MMM d, yyyy h:mm a')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {announcement.category && <Badge variant="outline">{announcement.category.name}</Badge>}
              {(canEdit || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {canEdit && (
                      <DropdownMenuItem asChild>
                        <Link href={route('announcements.edit', announcement.id)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {canDelete && (
                      <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                        <Trash className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold">{announcement.title}</h1>
            {announcement.images && announcement.images.length > 0 && (
              <ImageGallery 
                images={announcement.images} 
                maxHeight="h-80" 
                className="mt-4"
              />
            )}
            <div className="rounded-md bg-[var(--bn-colors-editor-background)] py-4">
              <BlockNoteView editor={editor} editable={false} theme={appearance === 'system' ? 'light' : appearance} data-theming />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton postId={announcement.id} initialLikesCount={announcement.likes_count} isLiked={announcement.is_liked} />
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-1 h-4 w-4" />
                {announcement.comments.length || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="space-y-6">
        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">Comments ({announcement.comments.length || 0})</h2>

          {/* Add Comment Form */}
          {onAddComment && (
            <div className="mb-6">
              <CommentForm onSubmit={onAddComment} isLoading={isLoadingComment} />
            </div>
          )}

          {/* Comments List */}
          <CommentsList
            comments={announcement.comments || []}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
            canEditComments={canEditComments}
            canDeleteComments={canDeleteComments}
          />
        </div>
      </div>
    </div>
  );
}
