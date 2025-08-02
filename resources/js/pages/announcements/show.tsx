import { AnnouncementDetail } from '@/components/announcement-detail';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Announcement, PostComment, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function AnnouncementShow({ announcement }: { announcement: Announcement }) {
  const { auth } = usePage<SharedData>().props;
  const handleAddComment = (content: string) => {
    router.post(`/announcements/${announcement.id}/comments`, {
      content: content,
    });
  };

  const handleEditComment = (comment: PostComment) => {
    // TODO: Implement edit comment functionality
    console.log('Edit comment:', comment);
  };

  const handleDeleteComment = (comment: PostComment) => {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      // TODO: Add route for deleting comments
      console.log('Delete comment:', comment);
    }
  };

  const handleDeleteAnnouncement = (announcement: Announcement) => {
    if (confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      router.delete(route('announcements.destroy', announcement.id));
    }
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Announcements', href: '/announcements' },
        { title: announcement.title, href: `/announcements/${announcement.id}` },
      ]}
    >
      <Container>
        <AnnouncementDetail
          announcement={announcement}
          onDelete={handleDeleteAnnouncement}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          canEdit={auth.user.is_staff} // TODO: Add proper authorization
          canDelete={auth.user.is_staff} // TODO: Add proper authorization
          canEditComments={auth.user.is_staff} // TODO: Add proper authorization
          canDeleteComments={auth.user.is_staff} // TODO: Add proper authorization
        />
      </Container>
    </AppLayout>
  );
}
