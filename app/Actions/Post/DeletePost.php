<?php

namespace App\Actions\Post;

use App\Models\Post;

class DeletePost
{
    /**
     * Delete the given post.
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function handle(Post $post): void
    {
        $post->delete();
    }
}
