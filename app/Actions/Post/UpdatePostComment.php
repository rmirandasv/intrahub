<?php

namespace App\Actions\Post;

use App\Models\PostComment;

class UpdatePostComment
{
    /**
     * @param PostComment $comment
     * @param array $data
     * @return PostComment
     */
    public function handle(PostComment $comment, array $data): PostComment
    {
        $comment->update($data);

        return $comment;
    }
}