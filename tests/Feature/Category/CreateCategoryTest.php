<?php

use App\Actions\Category\CreateCategory;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should create a category with all provided data', function () {
    $data = [
        'name' => 'Test Category',
        'description' => 'This is a test category description.',
    ];

    $createCategory = new CreateCategory;
    $category = $createCategory->handle($data);

    expect($category)->toBeInstanceOf(Category::class);
    expect($category->name)->toBe($data['name']);
    expect($category->description)->toBe($data['description']);
    expect($category->id)->not->toBeNull();
});

test('should create a category with factory data', function () {
    $data = Category::factory()->make()->toArray();

    $createCategory = new CreateCategory;
    $category = $createCategory->handle($data);

    expect($category)->toBeInstanceOf(Category::class);
    expect($category->name)->toBe($data['name']);
    expect($category->description)->toBe($data['description']);
    expect($category->id)->not->toBeNull();
});

test('should persist category to database', function () {
    $data = [
        'name' => 'Persistent Category',
        'description' => 'This category should be saved to the database.',
    ];

    $createCategory = new CreateCategory;
    $category = $createCategory->handle($data);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $data['name'],
        'description' => $data['description'],
    ]);
}); 