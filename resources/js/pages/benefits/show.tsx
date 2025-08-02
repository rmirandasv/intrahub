import { BenefitDetail } from '@/components/benefit-detail';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, PostComment, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function BenefitShow({ benefit }: { benefit: Benefit }) {
  const { auth } = usePage<SharedData>().props;
  const handleAddComment = (content: string) => {
    router.post(`/benefits/${benefit.id}/comments`, {
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

  const handleDeleteBenefit = (benefit: Benefit) => {
    if (confirm('¿Estás seguro de que quieres eliminar este benefit?')) {
      router.delete(route('benefits.destroy', benefit.id));
    }
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Benefits', href: '/benefits' },
        { title: benefit.post.title, href: `/benefits/${benefit.id}` },
      ]}
    >
      <Container>
        <BenefitDetail
          benefit={benefit}
          onDelete={handleDeleteBenefit}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          canEdit={auth.user.is_staff}
          canDelete={auth.user.is_staff}
          canEditComments={auth.user.is_staff}
          canDeleteComments={auth.user.is_staff}
        />
      </Container>
    </AppLayout>
  );
}
