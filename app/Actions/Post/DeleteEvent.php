<?php

namespace App\Actions\Post;

use App\Models\Event;

class DeleteEvent
{
    /**
     * @param Event $event
     */
    public function handle(Event $event): void
    {
        $event->post->delete();
    }
}