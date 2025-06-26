<?php

namespace Tests\Feature\Post;

use App\Actions\Post\TogglePostLike;
use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TogglePostLikeTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Post $post;
    private TogglePostLike $action;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->post = Post::factory()->create();
        $this->action = new TogglePostLike();
    }

    public function test_it_can_add_a_like_to_a_post()
    {
        // Act
        $result = $this->action->handle($this->post, $this->user);

        // Assert
        $this->assertTrue($result);
        $this->assertDatabaseHas('post_likes', [
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);
        $this->assertEquals(1, $this->post->likes()->count());
    }

    public function test_it_can_remove_a_like_from_a_post()
    {
        // Arrange - Create an existing like
        PostLike::create([
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);

        $result = $this->action->handle($this->post, $this->user);

        $this->assertFalse($result);
        $this->assertDatabaseMissing('post_likes', [
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);
        $this->assertEquals(0, $this->post->likes()->count());
    }

    public function test_it_can_toggle_like_multiple_times()
    {
        // First toggle should add like
        $result1 = $this->action->handle($this->post, $this->user);
        $this->assertTrue($result1);
        $this->assertEquals(1, $this->post->likes()->count());

        // Second toggle should remove like
        $result2 = $this->action->handle($this->post, $this->user);
        $this->assertFalse($result2);
        $this->assertEquals(0, $this->post->likes()->count());

        // Third toggle should add like again
        $result3 = $this->action->handle($this->post, $this->user);
        $this->assertTrue($result3);
        $this->assertEquals(1, $this->post->likes()->count());
    }

    public function test_it_works_with_multiple_users_liking_same_post()
    {
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        // All users like the same post
        $this->action->handle($this->post, $this->user);
        $this->action->handle($this->post, $user2);
        $this->action->handle($this->post, $user3);

        // Should have 3 likes total
        $this->assertEquals(3, $this->post->likes()->count());
        
        // Each user should have their own like record
        $this->assertDatabaseHas('post_likes', [
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);
        $this->assertDatabaseHas('post_likes', [
            'user_id' => $user2->id,
            'post_id' => $this->post->id,
        ]);
        $this->assertDatabaseHas('post_likes', [
            'user_id' => $user3->id,
            'post_id' => $this->post->id,
        ]);
    }

    public function test_it_works_with_multiple_posts()
    {
        $post2 = Post::factory()->create();
        $post3 = Post::factory()->create();

        // User likes multiple posts
        $this->action->handle($this->post, $this->user);
        $this->action->handle($post2, $this->user);
        $this->action->handle($post3, $this->user);

        // Each post should have 1 like
        $this->assertEquals(1, $this->post->likes()->count());
        $this->assertEquals(1, $post2->likes()->count());
        $this->assertEquals(1, $post3->likes()->count());

        // User should have 3 likes total
        $this->assertEquals(3, $this->user->likes()->count());
    }
} 