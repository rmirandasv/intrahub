<?php

use App\Actions\Category\UpdateCategory;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should update the category name', function () {
    $category = Category::factory()->create([
        'name' => 'Old Category Name',
        'description' => 'Old description',
    ]);

    $updateCategory = new UpdateCategory();
    $updatedCategory = $updateCategory->handle($category, [
        'name' => 'New Category Name',
        'description' => 'Old description',
    ]);

    expect($updatedCategory)->toBeInstanceOf(Category::class);
    expect($updatedCategory->name)->toBe('New Category Name');
    expect($updatedCategory->description)->toBe('Old description');
});

test('should update the category description', function () {
    $category = Category::factory()->create([
        'name' => 'Test Category',
        'description' => 'Old description',
    ]);

    $updateCategory = new UpdateCategory();
    $updatedCategory = $updateCategory->handle($category, [
        'name' => 'Test Category',
        'description' => 'New updated description',
    ]);

    expect($updatedCategory)->toBeInstanceOf(Category::class);
    expect($updatedCategory->name)->toBe('Test Category');
    expect($updatedCategory->description)->toBe('New updated description');
});

test('should update both name and description', function () {
    $category = Category::factory()->create([
        'name' => 'Old Name',
        'description' => 'Old description',
    ]);

    $updateCategory = new UpdateCategory();
    $updatedCategory = $updateCategory->handle($category, [
        'name' => 'New Name',
        'description' => 'New description',
    ]);

    expect($updatedCategory)->toBeInstanceOf(Category::class);
    expect($updatedCategory->name)->toBe('New Name');
    expect($updatedCategory->description)->toBe('New description');
});

test('should persist changes to database', function () {
    $category = Category::factory()->create([
        'name' => 'Original Name',
        'description' => 'Original description',
    ]);

    $updateData = [
        'name' => 'Updated Name',
        'description' => 'Updated description',
    ];

    $updateCategory = new UpdateCategory();
    $updatedCategory = $updateCategory->handle($category, $updateData);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $updateData['name'],
        'description' => $updateData['description'],
    ]);

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
        'name' => 'Original Name',
        'description' => 'Original description',
    ]);
});

test('should return the same category instance', function () {
    $category = Category::factory()->create([
        'name' => 'Test Category',
        'description' => 'Test description',
    ]);

    $updateCategory = new UpdateCategory();
    $updatedCategory = $updateCategory->handle($category, [
        'name' => 'Updated Category',
        'description' => 'Updated description',
    ]);

    expect($updatedCategory)->toBe($category);
    expect($updatedCategory->id)->toBe($category->id);
}); 