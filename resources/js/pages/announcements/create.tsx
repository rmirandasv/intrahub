import AnnouncementForm, { AnnouncementFormValues } from '@/components/announcement-form';
import Heading from "@/components/heading";
import Container from "@/components/ui/container";
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function AnnouncementCreate() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: AnnouncementFormValues) => {
    setLoading(true);
    router.post('/announcements', data, {
      onFinish: () => setLoading(false),
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
        <AnnouncementForm onSubmit={onSubmit} loading={loading} />
      </Container>
    </AppLayout>
  );
}
