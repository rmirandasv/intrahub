import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Event } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Edit, EllipsisVertical, MapPin, Trash, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface EventCardProps {
  event: Event;
  onDelete?: (event: Event) => void;
  // onRSVP?: (event: Event) => void;
  // onCancelRSVP?: (event: Event) => void;
  isRSVPed?: boolean;
}

export function EventCard({ event, onDelete, isRSVPed }: EventCardProps) {
  const { post } = event;
  const handleDelete = () => {
    if (onDelete) {
      onDelete(event);
    }
  };

  // const handleRSVP = () => {
  //   if (onRSVP) onRSVP(event);
  // };
  // const handleCancelRSVP = () => {
  //   if (onCancelRSVP) onCancelRSVP(event);
  // };

  // Attendance calculation
  const attending = post.likes_count || 0;
  const capacity = event.capacity || 0;
  const attendancePercent = capacity > 0 ? Math.round((attending / capacity) * 100) : 0;

  // Date formatting
  const eventDate = event.event_date ? new Date(event.event_date) : null;
  const eventDateStr = eventDate ? eventDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  // Horario (no hay campo de hora en Event, así que solo fecha)

  // Short description
  const shortContent = post.content.length > 80 ? post.content.slice(0, 77) + '...' : post.content;

  // Primera imagen si existe
  const imageUrl = post.images && post.images.length > 0 ? post.images[0] : null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {post.category && <Badge variant="outline">{post.category.name}</Badge>}
              {post.is_featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={route('events.edit', event.id)} className="flex items-center gap-2">
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
      {imageUrl ? (
        <div className="mb-2 flex h-36 w-full items-center justify-center overflow-hidden rounded-md bg-muted">
          <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="mb-2 flex h-36 w-full items-center justify-center overflow-hidden rounded-md bg-muted">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      )}
      <CardContent className="pb-3">
        <CardTitle className="mb-1 text-lg font-semibold">{post.title}</CardTitle>
        <CardDescription className="mb-2 text-sm">{shortContent}</CardDescription>
        <div className="mb-2 space-y-1">
          {eventDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{eventDateStr}</span>
            </div>
          )}
          {/* Si hay horario, agregar aquí con <Clock /> */}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
          {capacity > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {attending} / {capacity} attending
              </span>
            </div>
          )}
        </div>
        {capacity > 0 && (
          <div className="mb-2">
            <div className="mb-1 flex justify-between text-xs">
              <span>Attendance</span>
              <span>{attendancePercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-2 bg-primary" style={{ width: `${attendancePercent}%` }} />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        {/* RSVP/Cancel RSVP button, solo UI, hooks comentados */}
        {/*
        {isRSVPed ? (
          <Button variant="outline" className="w-full" onClick={handleCancelRSVP}>
            Cancel RSVP
          </Button>
        ) : (
          <Button className="w-full" onClick={handleRSVP}>
            RSVP to Event
          </Button>
        )}
        */}
        <Button className="w-full" disabled>
          RSVP to Event
        </Button>
      </CardFooter>
    </Card>
  );
}
