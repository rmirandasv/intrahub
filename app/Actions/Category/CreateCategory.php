<?php

namespace App\Actions\Category;

use App\Models\Category;

class CreateCategory
{
    /**
     * Create a new category
     *
     * @param  array  $data{  name: string, description: string }
     */
    public function handle(array $data): Category
    {
        return Category::create($data);
    }
}
