<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;

class TogglePostLike
{
    /**
     * Toggle the like status for a post by a user.
     *
     * If the user has already liked the post, the like will be removed.
     * If the user hasn't liked the post, a new like will be created.
     *
     * @return bool Returns true if a like was added, false if a like was removed
     */
    public function handle(Post $post, User $user): bool
    {
        $existingLike = PostLike::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();

            return false;
        }

        PostLike::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);

        return true;
    }
}
