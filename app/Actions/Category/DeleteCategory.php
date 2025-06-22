<?php

namespace App\Actions\Category;

use App\Models\Category;

class DeleteCategory
{
    /**
     * Delete a category
     */
    public function handle(Category $category): void
    {
        $category->delete();
    }
}
