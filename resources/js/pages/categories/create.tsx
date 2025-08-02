import CategoryForm, { CategoryFormValues } from '@/components/category-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: CategoryFormValues) => {
    setLoading(true);

    router.post('/categories', values, {
      onFinish: () => setLoading(false),
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Categories', href: '/categories' },
        { title: 'Create Category', href: '/categories/create' },
      ]}
    >
      <Container>
        <Heading title="Create Category" description="Create a new category" />
        <CategoryForm onSubmit={handleSubmit} loading={loading} />
      </Container>
    </AppLayout>
  );
}
