import { AnnouncementCard } from "@/components/announcement-card";
import { AnnouncementDeleteModal } from "@/components/announcement-delete-modal";
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Announcement, Paginated } from "@/types";
import { Link } from '@inertiajs/react';
import { useState } from 'react';

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
      <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Company Announcements</h1>
              <p className="text-muted-foreground">Stay informed with the latest company news and updates</p>
            </div>
            <Button asChild>
              <Link href="/announcements/create">Create Announcement</Link>
            </Button>
          </div>
        </div>
        <div className="mt-6 space-y-6">
          {announcements.data.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id} 
              announcement={announcement} 
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      </div>

      <AnnouncementDeleteModal
        announcement={announcementToDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
      />
    </AppLayout>
  );
}
