import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Category } from '@/types';
import { Link } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { Edit, EllipsisVertical, FileText, Trash } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface CategoryCardProps {
  category: Category;
  onDelete?: (category: Category) => void;
}

export function CategoryCard({ category, onDelete }: CategoryCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(category);
    }
  };

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Created {formatDistanceToNow(category.created_at, { addSuffix: true })}</span>
                {category.updated_at !== category.created_at && (
                  <>
                    <span>•</span>
                    <span>Updated {formatDistanceToNow(category.updated_at, { addSuffix: true })}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {category.post_count || 0} posts
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{category.description || 'No description provided'}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Created: {format(category.created_at, 'MMM d, yyyy')}</span>
            {category.updated_at !== category.created_at && (
              <>
                <span>•</span>
                <span>Updated: {format(category.updated_at, 'MMM d, yyyy')}</span>
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
                <Link href={`/categories/${category.id}/edit`} className="flex items-center gap-2">
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
