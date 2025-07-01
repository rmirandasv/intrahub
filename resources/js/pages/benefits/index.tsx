import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, Paginated } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { BenefitCard } from '@/components/benefit-card';
import { BenefitDeleteModal } from '@/components/benefit-delete-modal';

export default function BenefitIndex({ benefits }: { benefits: Paginated<Benefit> }) {
  const [benefitToDelete, setBenefitToDelete] = useState<Benefit | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (benefit: Benefit) => {
    setBenefitToDelete(benefit);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setBenefitToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Benefits', href: '/benefits' }]}>
      <Container>
        <Heading title="Company Benefits" description="Stay informed with the latest company benefits and updates">
          <Button asChild>
            <Link href="/benefits/create">Create Benefit</Link>
          </Button>
        </Heading>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.data.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} onDelete={handleDelete} />
          ))}
        </div>
      </Container>
      
      <BenefitDeleteModal
        benefit={benefitToDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
      />
    </AppLayout>
  );
}
