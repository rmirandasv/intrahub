import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { Edit, EllipsisVertical, Mail, Trash, User as UserIcon } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface UserCardProps {
  user: User;
  onDelete?: (user: User) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(user);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user.email_verified_at ? (
              <Badge variant="default" className="text-xs">
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Unverified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <UserIcon className="h-3 w-3" />
            <span>Member since {format(new Date(user.created_at), 'MMM yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Created: {format(new Date(user.created_at), 'MMM d, yyyy')}</span>
            {user.updated_at !== user.created_at && (
              <>
                <span>•</span>
                <span>Updated: {format(new Date(user.updated_at), 'MMM d, yyyy')}</span>
              </>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/users/${user.id}/edit`} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
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