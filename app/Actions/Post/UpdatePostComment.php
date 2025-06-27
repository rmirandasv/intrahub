<?php

namespace App\Actions\Post;

use App\Models\PostComment;

class UpdatePostComment
{
    public function handle(PostComment $comment, array $data): PostComment
    {
        $comment->update($data);

        return $comment;
    }
}
