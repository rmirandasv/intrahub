import { AnnouncementCard } from '@/components/announcement-card';
import { AnnouncementDeleteModal } from '@/components/announcement-delete-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Announcement, Paginated } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Folder, Megaphone } from 'lucide-react';

export default function AnnouncementIndex({ announcements }: { announcements: Paginated<Announcement> }) {
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setAnnouncementToDelete(null);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Announcements', href: '/announcements' }]}>
      <Container>
        <Heading title="Company Announcements" description="Stay informed with the latest company news and updates">
          <Button asChild>
            <Link href="/announcements/create">Create Announcement</Link>
          </Button>
        </Heading>
        {announcements.data.length === 0 ? (
          <div className="mt-8 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground/50">
              <Megaphone className="h-12 w-12" />
            </div>
            <h3 className="font-semibol mt-2 text-sm">No announcements</h3>
            <p className="mt-1 text-sm text-foreground">Get started by creating a new announcement.</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/announcements/create">Create Announcement</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {announcements.data.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} onDelete={handleDeleteClick} />
            ))}
          </div>
        )}
      </Container>

      <AnnouncementDeleteModal announcement={announcementToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </AppLayout>
  );
}
