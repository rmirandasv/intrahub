import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, Paginated } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function BenefitIndex({ benefits }: { benefits: Paginated<Benefit> }) {
  const [benefitToDelete, setBenefitToDelete] = useState<Benefit | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <AppLayout breadcrumbs={[{ title: 'Benefits', href: '/benefits' }]}>
      <Container>
        <Heading title="Company Benefits" description="Stay informed with the latest company benefits and updates">
          <Button asChild>
            <Link href="/benefits/create">Create Benefit</Link>
          </Button>
        </Heading>
      </Container>
    </AppLayout>
  );
}
