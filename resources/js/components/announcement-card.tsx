import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { LikeButton } from '@/components/ui/like-button';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { Announcement } from '@/types';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Link } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock, Edit, EllipsisVertical, MessageCircle, Share2, Trash } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AnnouncementCardProps {
  announcement: Announcement;
  onDelete?: (announcement: Announcement) => void;
}

export function AnnouncementCard({ announcement, onDelete }: AnnouncementCardProps) {
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={announcement.user.name || '/placeholder.svg'} />
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
          {announcement.category && <Badge variant="outline">{announcement.category.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{announcement.title}</h3>
          <div className="rounded-md bg-[var(--bn-colors-editor-background)] py-4">
            <BlockNoteView editor={editor} editable={false} theme={appearance === 'system' ? 'light' : appearance} data-theming />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <LikeButton
              postId={announcement.id}
              initialLikesCount={announcement.likes_count}
              isLiked={announcement.is_liked}
            />
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-1 h-4 w-4" />
              {2}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={route('announcements.edit', announcement.id)} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
