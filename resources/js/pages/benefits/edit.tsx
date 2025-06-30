import BenefitForm, { BenefitFormValues } from '@/components/benefit-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Benefit, Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function BenefitEdit({ 
  benefit, 
  categories 
}: { 
  benefit: Benefit; 
  categories: Category[] 
}) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: BenefitFormValues) => {
    setLoading(true);
    
    router.put(`/benefits/${benefit.id}`, data, {
      onFinish: () => setLoading(false),
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  const initialData = {
    title: benefit.post.title,
    content: benefit.post.content,
    expiration_date: benefit.post.expiration_date ? new Date(benefit.post.expiration_date) : null,
    is_featured: benefit.post.is_featured,
    category_id: benefit.post.category?.id?.toString() || '',
    images: [],
    partner_name: benefit.partner_name,
    website: benefit.website || '',
    email: benefit.email || '',
    phone: benefit.phone || '',
    address: benefit.address || '',
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Benefits', href: '/benefits' },
        { title: benefit.post.title, href: `/benefits/${benefit.id}` },
        { title: 'Edit Benefit', href: `/benefits/${benefit.id}/edit` },
      ]}
    >
      <Container>
        <Heading title="Edit benefit" />
        <BenefitForm 
          onSubmit={onSubmit} 
          loading={loading} 
          categories={categories}
          initialData={initialData}
        />
      </Container>
    </AppLayout>
  );
} 