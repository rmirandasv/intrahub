<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;

class CreatePostComment
{
    /**
     * @param Post $post
     * @param User $user
     * @param array $data
     * @return PostComment
     */
    public function handle(Post $post, User $user, array $data): PostComment
    {
        return PostComment::create([
            'post_id' => $post->id,
            'user_id' => $user->id,
            'content' => $data['content'],
            'parent_id' => $data['parent_id'] ?? null,
        ]);
    }
}