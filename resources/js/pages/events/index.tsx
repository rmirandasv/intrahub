import { EventCard } from '@/components/event-card';
import { EventDeleteModal } from '@/components/event-delete-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Event, Paginated, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

export default function EventIndex({ events }: { events: Paginated<Event> }) {
  const { auth } = usePage<SharedData>().props;
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setEventToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Events', href: '/events' }]}>
      <Container>
        <Heading title="Events" description="Company events">
          {auth.user.is_staff ? (
            <Button asChild>
              <Link href="/events/create">Create Event</Link>
            </Button>
          ) : null}
        </Heading>
        {events.data.length === 0 ? (
          <div className="mt-8 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground/50">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="font-semibol mt-2 text-sm">No events</h3>
            <p className="mt-1 text-sm text-foreground">Get started by creating a new event.</p>
            {auth.user.is_staff ? (
              <div className="mt-6">
                <Button asChild>
                  <Link href="/events/create">Create Event</Link>
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.data.map((event) => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Container>
      <EventDeleteModal event={eventToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </AppLayout>
  );
}
