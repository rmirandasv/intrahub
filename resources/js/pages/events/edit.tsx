import EventForm, { EventFormValues } from '@/components/event-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category, Event } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function EditEventPage({ event, categories }: { event: Event; categories: Category[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: EventFormValues) => {
    setIsLoading(true);
    router.put(route('events.update', event.id), data, {
      onFinish: () => setIsLoading(false),
    });
  };
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Events', href: route('events.index') },
        { title: 'Edit Event', href: route('events.edit', event.id) },
      ]}
    >
      <Container>
        <Heading title="Edit event" description="Edit the event details" />
        <EventForm
          categories={categories}
          loading={isLoading}
          initialData={{
            title: event.post.title,
            content: event.post.content,
            event_date: event.event_date ? new Date(event.event_date) : undefined,
            location: event.location,
            capacity: event.capacity,
            expiration_date: event.post.expiration_date ? new Date(event.post.expiration_date) : undefined,
            is_featured: event.post.is_featured,
            category_id: event.post.category_id?.toString(),
          }}
          onSubmit={handleSubmit}
        />
      </Container>
    </AppLayout>
  );
}
