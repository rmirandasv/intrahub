<?php

namespace App\Actions\Post;

use App\Models\Event;

class DeleteEvent
{
    public function handle(Event $event): void
    {
        $event->post->delete();
    }
}
