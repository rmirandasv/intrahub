import { BenefitCard } from '@/components/benefit-card';
import { BenefitDeleteModal } from '@/components/benefit-delete-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, Paginated, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Gift } from 'lucide-react';
import { useState } from 'react';

export default function BenefitIndex({ benefits }: { benefits: Paginated<Benefit> }) {
  const { auth } = usePage<SharedData>().props;
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
          {auth.user.is_staff ? (
            <Button asChild>
              <Link href="/benefits/create">Create Benefit</Link>
            </Button>
          ) : null}
        </Heading>
        {benefits.data.length === 0 ? (
          <div className="mt-8 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground/50">
              <Gift className="h-12 w-12" />
            </div>
            <h3 className="font-semibol mt-2 text-sm">No benefits</h3>
            <p className="mt-1 text-sm text-foreground">Get started by creating a new benefit.</p>
            {auth.user.is_staff ? (
              <div className="mt-6">
                <Button asChild>
                  <Link href="/benefits/create">Create Benefit</Link>
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.data.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Container>

      <BenefitDeleteModal benefit={benefitToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </AppLayout>
  );
}
