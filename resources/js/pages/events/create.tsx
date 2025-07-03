import EventForm, { EventFormValues } from '@/components/event-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: EventFormValues) => {
    setLoading(true);

    router.post('/events', data, {
      onFinish: () => setLoading(false),
      forceFormData: true,
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Events', href: '/events' },
        { title: 'Create Event', href: '/events/create' },
      ]}
    >
      <Container>
        <Heading title="Create Event" description="Create a new event" />
        <EventForm onSubmit={onSubmit} loading={loading} categories={categories} />
      </Container>
    </AppLayout>
  );
}
