<?php

use App\Actions\Post\UpdateAnnouncement;
use App\Enums\PostType;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('should update the announcement with new title', function () {
    $post = Post::factory()->create([
        'title' => 'Old Title',
        'content' => 'Old Content',
        'user_id' => User::factory()->create()->id,
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $updateAnnouncement = new UpdateAnnouncement;
    $updateAnnouncement->handle($post, [
        'title' => 'New Title',
        'content' => 'Old Content',
    ]);

    $post->refresh();

    expect($post->title)->toBe('New Title');
    expect($post->content)->toBe('Old Content');
});

test('should update the announcement with new expiration date', function () {
    $post = Post::factory()->create([
        'title' => 'Old Title',
        'content' => 'Old Content',
        'expiration_date' => now()->subDays(5),
        'user_id' => User::factory()->create()->id,
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $updateAnnouncement = new UpdateAnnouncement;
    $updateAnnouncement->handle($post, [
        'title' => 'Old Title',
        'content' => 'Old Content',
        'expiration_date' => now()->addDays(5),
    ]);

    $post->refresh();

    expect($post->expiration_date->toFormattedDateString())->toEqual(now()->addDays(5)->toFormattedDateString());
});

test('should update the announcement with featured status set to true', function () {
    $post = Post::factory()->create([
        'title' => 'Old Title',
        'content' => 'Old Content',
        'is_featured' => false,
        'user_id' => User::factory()->create()->id,
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $updateAnnouncement = new UpdateAnnouncement;
    $updateAnnouncement->handle($post, [
        'title' => 'Old Title',
        'content' => 'Old Content',
        'is_featured' => true,
    ]);

    $post->refresh();

    expect($post->is_featured)->toBeTrue();
});

test('should update the announcement with featured status set to false', function () {
    $post = Post::factory()->create([
        'title' => 'Old Title',
        'content' => 'Old Content',
        'is_featured' => true,
        'user_id' => User::factory()->create()->id,
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $updateAnnouncement = new UpdateAnnouncement;
    $updateAnnouncement->handle($post, [
        'title' => 'Old Title',
        'content' => 'Old Content',
        'is_featured' => false,
    ]);

    $post->refresh();

    expect($post->is_featured)->toBeFalse();
});

test('should handle null values for optional fields', function () {
    $post = Post::factory()->create([
        'title' => 'Old Title',
        'content' => 'Old Content',
        'expiration_date' => now()->subDays(5),
        'is_featured' => true,
        'user_id' => User::factory()->create()->id,
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $updateAnnouncement = new UpdateAnnouncement;
    $updateAnnouncement->handle($post, [
        'title' => 'New Title',
        'content' => 'New Content',
        'expiration_date' => null,
        'is_featured' => null,
    ]);

    $post->refresh();

    expect($post->title)->toBe('New Title');
    expect($post->content)->toBe('New Content');
    expect($post->expiration_date)->toBeNull();
    expect($post->is_featured)->toBeFalse();
});
