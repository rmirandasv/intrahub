import CategoryForm, { CategoryFormValues } from "@/components/category-form";
import Heading from '@/components/heading';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types';
import { router } from "@inertiajs/react";

export default function EditCategory({ category }: { category: Category }) {
  const handleSubmit = (values: CategoryFormValues) => {
    router.put(`/categories/${category.id}`, values);
  };
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Categories', href: '/categories' },
        { title: 'Edit Category', href: '/categories/edit' },
      ]}
    >
      <Container>
        <Heading title="Edit Category" description="Edit a category" />
        <CategoryForm onSubmit={handleSubmit} category={category} />
      </Container>
    </AppLayout>
  );
}
