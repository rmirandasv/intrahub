import CategoryForm, { CategoryFormValues } from '@/components/category-form';
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function EditCategory({ category }: { category: Category }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: CategoryFormValues) => {
    setLoading(true);
    
    router.put(`/categories/${category.id}`, values, {
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
        { title: 'Edit Category', href: '/categories/edit' },
      ]}
    >
      <Container>
        <Heading title="Edit Category" description="Edit category details" />
        <CategoryForm onSubmit={handleSubmit} category={category} loading={loading} />
      </Container>
    </AppLayout>
  );
}
