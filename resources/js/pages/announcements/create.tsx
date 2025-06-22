import AnnouncementForm, { AnnouncementFormValues } from '@/components/announcement-form';
import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AnnouncementCreate() {
  const { errors } = usePage().props;
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
      <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Announcement</h1>
            <p className="text-muted-foreground">Add a new announcement to share important information with your team and stakeholders.</p>
          </div>
          <AnnouncementForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </AppLayout>
  );
}
