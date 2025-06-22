<?php

namespace App\Actions\Post;

use App\Enums\PostType;
use App\Models\Post;
use App\Models\User;

class CreateAnnouncement
{
    /**
     * Create a new announcement for the given user.
     * @param  \App\Models\User  $user
     * @param  array  $data{ title: string, content: string, expiration_date: string, is_featured: boolean }
     * @return \App\Models\Post
     *  
     */
    public function handle(User $user, array $data): Post
    {
        return Post::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'post_type' => PostType::ANNOUNCEMENT,
            'user_id' => $user->id,
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
        ]);
    }
}
