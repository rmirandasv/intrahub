<?php

use App\Actions\Post\DeletePost;
use App\Enums\PostType;
use App\Models\Post;

use function PHPUnit\Framework\assertFalse;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('should delete the post when the post exists', function () {
    $post = Post::factory()->create([
        'post_type' => PostType::ANNOUNCEMENT,
    ]);

    $postId = $post->id;

    $deletePostAction = new DeletePost;
    $deletePostAction->handle($post);

    assertFalse(Post::where('id', $postId)->exists(), false);
});
