<?php

namespace App\Actions\Post;

use App\Enums\PostType;
use App\Models\Event;
use App\Models\Post;
use App\Models\User;

class CreateEvent
{
    /**
     * @param array{
     *                        title: string,
     *                        content: string,
     *                        event_date: string,
     *                        location: string,
     *                        capacity: int | null,
     *                        images: array | null,
     *                        expiration_date: string | null,
     *                        is_featured: bool,
     *                        category_id: string | null,
     *                        }
     */
    public function handle(User $user, array $data): Event
    {
        $post = Post::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'content' => $data['content'],
            'post_type' => PostType::EVENT,
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'category_id' => $data['category_id'] ?? null,
        ]);

        $event = Event::create([
            'post_id' => $post->id,
            'event_date' => $data['event_date'],
            'location' => $data['location'],
            'capacity' => $data['capacity'] ?? null,
        ]);

        if (isset($data['images'])) {
            if (is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $post->addMedia($image)->toMediaCollection('images');
                }
            } else {
                $post->addMedia($data['images'])->toMediaCollection('images');
            }
        }

        return $event;
    }
}