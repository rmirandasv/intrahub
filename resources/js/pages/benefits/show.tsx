import { BenefitDetail } from '@/components/benefit-detail';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, PostComment } from '@/types';
import { router } from '@inertiajs/react';

export default function BenefitShow({ benefit }: { benefit: Benefit }) {
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
          canEdit={true} // TODO: Add proper authorization
          canDelete={true} // TODO: Add proper authorization
          canEditComments={true} // TODO: Add proper authorization
          canDeleteComments={true} // TODO: Add proper authorization
        />
      </Container>
    </AppLayout>
  );
}
