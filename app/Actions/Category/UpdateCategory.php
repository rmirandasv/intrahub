<?php

namespace App\Actions\Category;

use App\Models\Category;

class UpdateCategory
{
    /**
     * Update a category
     *
     * @param  array  $data{  name: string, description: string }
     */
    public function handle(Category $category, array $data): Category
    {
        $category->update($data);

        return $category;
    }
}
