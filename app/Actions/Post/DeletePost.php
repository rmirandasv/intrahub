<?php

namespace App\Actions\Post;

use App\Models\Post;

class DeletePost
{
    /**
     * Delete the given post.
     */
    public function handle(Post $post): void
    {
        $post->delete();
    }
}
