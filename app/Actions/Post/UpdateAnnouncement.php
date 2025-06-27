<?php

namespace App\Actions\Post;

use App\Models\Post;

class UpdateAnnouncement
{
    /**
     * Update the announcement with the given data.
     *
     * @param  array  $data{  title: string, content: string, expiration_date: string, is_featured: boolean, category_id: string | null, images: array | null }
     */
    public function handle(Post $post, array $data): void
    {
        $post->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'category_id' => $data['category_id'] ?? null,
        ]);

        if ($data['images']) {
            $post->clearMediaCollection('announcements');
            $post->addMediaFromUrl($data['images'])->toMediaCollection('announcements');
        }
    }
}
