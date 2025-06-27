<?php

namespace App\Actions\Post;

use App\Models\PostComment;

class DeletePostComment
{
    public function handle(PostComment $comment): void
    {
        $comment->delete();
    }
}
