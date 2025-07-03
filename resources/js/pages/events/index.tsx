import { EventCard } from '@/components/event-card';
import { EventDeleteModal } from '@/components/event-delete-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Event, Paginated } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EventIndex({ events }: { events: Paginated<Event> }) {
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
          <Button asChild>
            <Link href="/events/create">Create Event</Link>
          </Button>
        </Heading>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.data.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} />
          ))}
        </div>
      </Container>
      <EventDeleteModal event={eventToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </AppLayout>
  );
}
