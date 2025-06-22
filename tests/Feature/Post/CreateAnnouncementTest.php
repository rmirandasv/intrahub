<?php

use App\Actions\Post\CreateAnnouncement;
use App\Enums\PostType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should create an announcement with all provided data', function () {
    $user = User::factory()->create();
    $data = [
        'title' => 'Test Announcement',
        'content' => 'This is a test announcement.',
        'expiration_date' => now()->addDays(30),
        'is_featured' => true,
    ];

    $createAnnouncement = new CreateAnnouncement;
    $post = $createAnnouncement->handle($user, $data);

    expect($post->title)->toBe($data['title']);
    expect($post->content)->toBe($data['content']);
    expect($post->post_type)->toBe(PostType::ANNOUNCEMENT);
    expect($post->user_id)->toBe($user->id);
    expect($post->expiration_date->toFormattedDateString())->toBe($data['expiration_date']->toFormattedDateString());
    expect($post->is_featured)->toBeTrue();
});
