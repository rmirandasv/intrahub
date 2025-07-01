import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Benefit } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Edit, EllipsisVertical, Globe, MapPin, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface BenefitCardProps {
  benefit: Benefit;
  onDelete?: (benefit: Benefit) => void;
}

export function BenefitCard({ benefit, onDelete }: BenefitCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(benefit);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {benefit.post.category && <Badge variant="outline">{benefit.post.category.name}</Badge>}
              {benefit.post.is_featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
            <CardTitle className="mt-1 text-lg font-semibold">{benefit.post.title}</CardTitle>
            <CardDescription className="text-sm">{benefit.partner_name}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={route('benefits.edit', benefit.id)} className="flex items-center gap-2">
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
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          {benefit.address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{benefit.address}</span>
            </div>
          )}
          {benefit.website && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a href={benefit.website} target="_blank" rel="noopener noreferrer" className="underline">
                {benefit.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {benefit.post.expiration_date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Valid Until: {new Date(benefit.post.expiration_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        <Link
          href={`/benefits/${benefit.id}`}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Learn More
        </Link>
      </CardFooter>
    </Card>
  );
}
