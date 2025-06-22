import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { Link } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { Edit, EllipsisVertical, FileText, Trash } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface CategoryTableProps {
  categories: Category[];
  onDelete?: (category: Category) => void;
}

export function CategoryTable({ categories, onDelete }: CategoryTableProps) {
  const handleDelete = (category: Category) => {
    if (onDelete) {
      onDelete(category);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Posts</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Updated</th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {categories.map((category) => (
            <tr key={category.id} className="transition-colors hover:bg-muted/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{category.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="max-w-xs truncate text-sm text-muted-foreground">{category.description || 'No description'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant="secondary" className="text-xs">
                  {category.post_count || 0}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                <div>
                  <div>{format(category.created_at, 'MMM d, yyyy')}</div>
                  <div className="text-xs">{formatDistanceToNow(category.created_at, { addSuffix: true })}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                {category.updated_at !== category.created_at ? (
                  <div>
                    <div>{format(category.updated_at, 'MMM d, yyyy')}</div>
                    <div className="text-xs">{formatDistanceToNow(category.updated_at, { addSuffix: true })}</div>
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
                      <Link href={`/categories/${category.id}/edit`} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(category)} className="text-red-600">
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
