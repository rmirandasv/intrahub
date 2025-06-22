import { CategoryCard } from '@/components/category-card';
import { CategoryDeleteModal } from '@/components/category-delete-modal';
import { CategoryTable } from '@/components/category-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { Category, Paginated } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesIndex({ categories }: { categories: Paginated<Category> }) {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Categories', href: '/categories' }]}>
      <Container>
        <Heading title="Categories" description="Manage your content categories">
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/categories/create">Create Category</Link>
            </Button>
            {categories.data.length > 0 && (
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'cards' | 'table')}>
                <ToggleGroupItem value="cards" aria-label="Toggle cards view">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Toggle table view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </Heading>

        {categories.data.length === 0 ? (
          <div className="mt-8 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground/50">
              <Folder className="h-12 w-12" />
            </div>
            <h3 className="font-semibol mt-2 text-sm">No categories</h3>
            <p className="mt-1 text-sm text-foreground">Get started by creating a new category.</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/categories/create">Create Category</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {viewMode === 'cards' ? (
              <div className="space-y-6">
                {categories.data.map((category) => (
                  <CategoryCard key={category.id} category={category} onDelete={handleDeleteClick} />
                ))}
              </div>
            ) : (
              <CategoryTable categories={categories.data} onDelete={handleDeleteClick} />
            )}
          </div>
        )}
      </Container>

      <CategoryDeleteModal category={categoryToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </AppLayout>
  );
}
