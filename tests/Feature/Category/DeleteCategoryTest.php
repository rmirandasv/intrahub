<?php

use App\Actions\Category\DeleteCategory;
use App\Models\Category;

use function PHPUnit\Framework\assertFalse;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('should delete the category when the category exists', function () {
    $category = Category::factory()->create([
        'name' => 'Test Category',
        'description' => 'Test description',
    ]);

    $categoryId = $category->id;

    $deleteCategoryAction = new DeleteCategory();
    $deleteCategoryAction->handle($category);

    assertFalse(Category::where('id', $categoryId)->exists(), false);
});

test('should remove category from database', function () {
    $category = Category::factory()->create();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $category->name,
        'description' => $category->description,
    ]);

    $deleteCategoryAction = new DeleteCategory();
    $deleteCategoryAction->handle($category);

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});

test('should handle deletion of multiple categories', function () {
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();
    $category3 = Category::factory()->create();

    $deleteCategoryAction = new DeleteCategory();

    // Delete first category
    $deleteCategoryAction->handle($category1);
    assertFalse(Category::where('id', $category1->id)->exists());

    // Delete second category
    $deleteCategoryAction->handle($category2);
    assertFalse(Category::where('id', $category2->id)->exists());

    // Verify third category still exists
    $this->assertDatabaseHas('categories', [
        'id' => $category3->id,
    ]);
});

test('should return void as expected', function () {
    $category = Category::factory()->create();

    $deleteCategoryAction = new DeleteCategory();
    $result = $deleteCategoryAction->handle($category);

    expect($result)->toBeNull();
}); 