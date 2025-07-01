import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ImageGallery } from '@/components/ui/image-gallery';
import { LikeButton } from '@/components/ui/like-button';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { Benefit, PostComment } from '@/types';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Link } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, Edit, EllipsisVertical, Globe, Mail, MapPin, MessageCircle, Phone, Share2, Trash } from 'lucide-react';
import { CommentForm } from './comment-form';
import { CommentsList } from './comments-list';

interface BenefitDetailProps {
  benefit: Benefit;
  onDelete?: (benefit: Benefit) => void;
  onAddComment?: (content: string) => void;
  onEditComment?: (comment: PostComment) => void;
  onDeleteComment?: (comment: PostComment) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canEditComments?: boolean;
  canDeleteComments?: boolean;
  isLoadingComment?: boolean;
}

export function BenefitDetail({
  benefit,
  onDelete,
  onAddComment,
  onEditComment,
  onDeleteComment,
  canEdit = false,
  canDelete = false,
  canEditComments = false,
  canDeleteComments = false,
  isLoadingComment = false,
}: BenefitDetailProps) {
  const initials = useInitials();
  const { appearance } = useAppearance();
  const editor = useCreateBlockNote({
    initialContent: benefit.post.content ? JSON.parse(benefit.post.content) : [],
  });

  const handleDelete = () => {
    if (onDelete) {
      onDelete(benefit);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={benefit.post.user.avatar || '/placeholder.svg'} />
                <AvatarFallback className="bg-foreground p-1 text-background">{initials(benefit.post.user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{benefit.post.user.name}</p>
                  {benefit.post.user.is_staff === true && (
                    <Badge variant="secondary" className="text-xs">
                      Staff
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(benefit.post.created_at, { addSuffix: true })} - {format(benefit.post.created_at, 'MMM d, yyyy h:mm a')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {benefit.post.category && <Badge variant="outline">{benefit.post.category.name}</Badge>}
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
                        <Link href={route('benefits.edit', benefit.id)} className="flex items-center gap-2">
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
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">{benefit.post.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">Partner: {benefit.partner_name}</p>
            </div>

            {/* Benefit Details */}
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-2">
              {benefit.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{benefit.address}</span>
                </div>
              )}
              {benefit.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={benefit.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                    {benefit.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {benefit.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${benefit.email}`} className="underline hover:text-primary">
                    {benefit.email}
                  </a>
                </div>
              )}
              {benefit.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${benefit.phone}`} className="underline hover:text-primary">
                    {benefit.phone}
                  </a>
                </div>
              )}
              {benefit.post.expiration_date && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Valid Until: {format(new Date(benefit.post.expiration_date), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>

            {/* Images */}
            {benefit.post.images && benefit.post.images.length > 0 && <ImageGallery images={benefit.post.images} maxHeight="h-80" className="mt-4" />}

            {/* Content */}
            <div className="rounded-md bg-[var(--bn-colors-editor-background)] py-4">
              <BlockNoteView editor={editor} editable={false} theme={appearance === 'system' ? 'light' : appearance} data-theming />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton postId={benefit.post.id} initialLikesCount={benefit.post.likes_count} isLiked={benefit.post.is_liked} />
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-1 h-4 w-4" />
                {benefit.post.comments?.length || 0}
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
          <h2 className="mb-4 text-xl font-semibold">Comments ({benefit.post.comments?.length || 0})</h2>

          {/* Add Comment Form */}
          {onAddComment && (
            <div className="mb-6">
              <CommentForm onSubmit={onAddComment} isLoading={isLoadingComment} />
            </div>
          )}

          {/* Comments List */}
          <CommentsList
            comments={benefit.post.comments || []}
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
