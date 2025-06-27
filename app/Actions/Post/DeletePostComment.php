<?php

namespace App\Actions\Post;

use App\Models\PostComment;

class DeletePostComment
{
    /**
     * @param PostComment $comment
     * @return void
     */
    public function handle(PostComment $comment): void
    {
        $comment->delete();
    }
}