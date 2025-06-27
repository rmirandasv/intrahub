import AnnouncementForm, { AnnouncementFormValues } from '@/components/announcement-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Announcement, Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function AnnouncementEdit({ announcement, categories }: { announcement: Announcement; categories: Category[] }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: AnnouncementFormValues) => {
    setLoading(true);
    router.put(`/announcements/${announcement.id}`, data, {
      onFinish: () => setLoading(false),
      forceFormData: true,
    });
  };

  const initialData = {
    title: announcement.title,
    content: announcement.content,
    expiration_date: announcement.expiration_date ? new Date(announcement.expiration_date) : null,
    is_featured: announcement.is_featured,
    category_id: announcement.category?.id.toString() ?? '',
    images: [], // Images will be handled separately in edit mode
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Announcements', href: '/announcements' },
        { title: `Edit Announcement ${announcement.id}`, href: `/announcements/${announcement.id}/edit` },
      ]}
    >
      <Container>
        <Heading title="Edit Announcement" />
        <AnnouncementForm onSubmit={onSubmit} loading={loading} initialData={initialData} categories={categories} />
      </Container>
    </AppLayout>
  );
}
