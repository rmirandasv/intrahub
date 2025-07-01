<?php

namespace App\Actions\Post;

use App\Models\Benefit;

class DeleteBenefit
{
    /**
     * Delete a benefit
     *
     * @param Benefit $benefit
     * @return void
     */
    public function handle(Benefit $benefit): void
    {
        $benefit->post->delete();
    }
}
