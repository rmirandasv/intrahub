import CategoryForm, { CategoryFormValues } from '@/components/category-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

export default function CreateCategory() {
  const handleSubmit = (values: CategoryFormValues) => {
    router.post('/categories', values);
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
        <CategoryForm onSubmit={handleSubmit} />
      </Container>
    </AppLayout>
  );
}
