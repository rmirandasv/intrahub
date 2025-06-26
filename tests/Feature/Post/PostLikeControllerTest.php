<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostLikeControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Post $post;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->post = Post::factory()->create();
    }

    public function test_guest_cannot_toggle_like()
    {
        $response = $this->post(route('posts.like.toggle', $this->post));

        $response->assertStatus(302);
    }

    public function test_user_can_toggle_like()
    {
        $response = $this->actingAs($this->user)
            ->post(route('posts.like.toggle', $this->post));

        $response->assertRedirect();
        $response->assertSessionHas('flash.type', 'success');
        $response->assertSessionHas('flash.message', 'Post liked successfully');
        
        $this->assertDatabaseHas('post_likes', [
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);
    }

    public function test_user_can_unlike_post()
    {
        // First like the post
        $this->actingAs($this->user)
            ->post(route('posts.like.toggle', $this->post));

        // Then unlike it
        $response = $this->actingAs($this->user)
            ->post(route('posts.like.toggle', $this->post));

        $response->assertRedirect();
        $response->assertSessionHas('flash.type', 'success');
        $response->assertSessionHas('flash.message', 'Post unliked successfully');
        
        $this->assertDatabaseMissing('post_likes', [
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);
    }

    public function test_like_toggle_redirects_back()
    {
        $response = $this->actingAs($this->user)
            ->from('/announcements')
            ->post(route('posts.like.toggle', $this->post));

        $response->assertRedirect('/announcements');
    }
} 