<?php

namespace App\Http\Controllers;

use App\Actions\Category\CreateCategory;
use App\Actions\Category\DeleteCategory;
use App\Actions\Category\UpdateCategory;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Category::class);

        $categories = Category::withCount('posts')->paginate(10);

        return Inertia::render(component: 'categories/index', props: [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Category::class);

        return Inertia::render(component: 'categories/create');
    }

    public function store(StoreCategoryRequest $request, CreateCategory $createCategory)
    {
        Gate::authorize('create', Category::class);

        $createCategory->handle($request->validated());

        return redirect()->route('categories.index');
    }

    public function edit(Category $category)
    {
        Gate::authorize('update', $category);

        return Inertia::render(component: 'categories/edit', props: [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category, UpdateCategory $updateCategory)
    {
        Gate::authorize('update', $category);

        $updateCategory->handle($category, $request->validated());

        return redirect()->route('categories.index');
    }

    public function destroy(Category $category, DeleteCategory $deleteCategory)
    {
        Gate::authorize('delete', $category);

        $deleteCategory->handle($category);

        return redirect()->route('categories.index');
    }
}
