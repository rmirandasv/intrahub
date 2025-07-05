import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { Edit, EllipsisVertical, Mail, Trash, User as UserIcon } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface UserTableProps {
  users: User[];
  onDelete?: (user: User) => void;
}

export function UserTable({ users, onDelete }: UserTableProps) {
  const handleDelete = (user: User) => {
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
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Member Since</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Last Updated</th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-muted/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Avatar className="mr-3 h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.email_verified_at ? (
                  <Badge variant="default" className="text-xs">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Unverified
                  </Badge>
                )}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                <div>
                  <div>{format(new Date(user.created_at), 'MMM d, yyyy')}</div>
                  <div className="text-xs">{formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                {user.updated_at !== user.created_at ? (
                  <div>
                    <div>{format(new Date(user.updated_at), 'MMM d, yyyy')}</div>
                    <div className="text-xs">{formatDistanceToNow(new Date(user.updated_at), { addSuffix: true })}</div>
                  </div>
                ) : (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
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
                    <DropdownMenuItem onClick={() => handleDelete(user)} className="text-red-600">
                      <Trash className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 