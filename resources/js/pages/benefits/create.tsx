import BenefitForm, { BenefitFormValues } from '@/components/benefit-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function BenefitCreate({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: BenefitFormValues) => {
    setLoading(true);

    router.post('/benefits', data, {
      onFinish: () => setLoading(false),
      forceFormData: true,
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Benefits', href: '/benefits' },
        { title: 'Create Benefit', href: '/benefits/create' },
      ]}
    >
      <Container>
        <Heading title="Create benefit" />
        <BenefitForm onSubmit={onSubmit} loading={loading} categories={categories} />
      </Container>
    </AppLayout>
  );
}
