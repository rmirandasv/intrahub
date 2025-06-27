import AnnouncementForm, { AnnouncementFormValues } from '@/components/announcement-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function AnnouncementCreate({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: AnnouncementFormValues) => {
    setLoading(true);
    router.post('/announcements', data, {
      onFinish: () => setLoading(false),
      forceFormData: true,
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Announcements', href: '/announcements' },
        { title: 'Create Announcement', href: '/announcements/create' },
      ]}
    >
      <Container>
        <Heading title="Create announcement" />
        <AnnouncementForm onSubmit={onSubmit} loading={loading} categories={categories} />
      </Container>
    </AppLayout>
  );
}
