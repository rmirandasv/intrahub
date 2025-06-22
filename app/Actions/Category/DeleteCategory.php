<?php

namespace App\Actions\Category;

use App\Models\Category;

class DeleteCategory
{
    /**
     * Delete a category
     *
     * @param Category $category
     * @return void
     */
    public function handle(Category $category): void
    {
        $category->delete();
    }
}
