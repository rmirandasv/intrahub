import AnnouncementForm, { AnnouncementFormValues } from '@/components/announcement-form';
import AppLayout from '@/layouts/app-layout';
import { Announcement } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AnnouncementEdit({ announcement }: { announcement: Announcement }) {
  const { errors } = usePage().props;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: AnnouncementFormValues) => {
    setLoading(true);
    router.put(`/announcements/${announcement.id}`, data, {
      onFinish: () => setLoading(false),
    });
  };

  const initialData = {
    title: announcement.title,
    content: announcement.content,
    expiration_date: announcement.expiration_date ? new Date(announcement.expiration_date) : null,
    is_featured: announcement.is_featured,
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Announcements', href: '/announcements' },
        { title: `Edit Announcement ${announcement.id}`, href: `/announcements/${announcement.id}/edit` },
      ]}
    >
      <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
            <p className="text-muted-foreground">Edit the announcement to share important information with your team and stakeholders.</p>
          </div>
          <AnnouncementForm onSubmit={onSubmit} loading={loading} initialData={initialData} />
        </div>
      </div>
    </AppLayout>
  );
}
