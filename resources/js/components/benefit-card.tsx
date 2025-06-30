import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Benefit } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, Globe } from 'lucide-react';

interface BenefitCardProps {
  benefit: Benefit;
  onDelete?: (benefit: Benefit) => void;
}

export function BenefitCard({ benefit, onDelete }: BenefitCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {benefit.post.category && (
                <Badge variant="outline">{benefit.post.category.name}</Badge>
              )}
              {benefit.post.is_featured && (
                <Badge variant="secondary" className="text-xs">Featured</Badge>
              )}
            </div>
            <CardTitle className="text-lg font-semibold mt-1">{benefit.post.title}</CardTitle>
            <CardDescription className="text-sm">{benefit.partner_name}</CardDescription>
          </div>
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
      <CardFooter className="pt-0 flex justify-end">
        <Link href={`/benefits/${benefit.id}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Learn More
        </Link>
      </CardFooter>
    </Card>
  );
} 