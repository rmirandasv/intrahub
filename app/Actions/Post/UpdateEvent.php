<?php

namespace App\Actions\Post;

use App\Models\Event;
use App\Models\Post;
use App\Models\User;

class UpdateEvent
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
    public function handle(Event $event, array $data): void
    {
        $event->post->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'category_id' => $data['category_id'] ?? null,
        ]);

        $event->update([
            'event_date' => $data['event_date'],
            'location' => $data['location'],
            'capacity' => $data['capacity'] ?? null,
        ]);

        if (isset($data['images'])) {
            $event->post->clearMediaCollection('images');
            if (is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $event->post->addMedia($image)->toMediaCollection('images');
                }
            } else {
                $event->post->addMedia($data['images'])->toMediaCollection('images');
            }
        }
    }
}