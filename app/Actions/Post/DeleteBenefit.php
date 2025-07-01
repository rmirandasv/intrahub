<?php

namespace App\Actions\Post;

use App\Models\Benefit;

class DeleteBenefit
{
    /**
     * Delete a benefit
     */
    public function handle(Benefit $benefit): void
    {
        $benefit->post->delete();
    }
}
