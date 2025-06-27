<?php

namespace App\Http\Controllers;

use App\Actions\Post\TogglePostLike;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PostLikeController extends Controller
{
    public function toggle(Request $request, Post $post, TogglePostLike $togglePostLike)
    {
        Gate::authorize('like', $post);

        $wasLiked = $togglePostLike->handle($post, $request->user());

        return redirect()
            ->back()
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => $wasLiked ? 'Post liked successfully' : 'Post unliked successfully',
                ],
            ]);
    }
}
