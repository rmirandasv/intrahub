<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreatePostComment;
use App\Actions\Post\DeletePostComment;
use App\Actions\Post\UpdatePostComment;
use App\Http\Requests\StorePostCommentRequest;
use App\Http\Requests\UpdatePostCommentRequest;
use App\Models\Post;
use App\Models\PostComment;

class PostCommentController extends Controller
{
    public function store(StorePostCommentRequest $request, Post $announcement, CreatePostComment $createPostComment)
    {
        $createPostComment->handle($announcement, $request->user(), $request->validated());

        return redirect()->route('announcements.show', $announcement);
    }

    public function update(UpdatePostCommentRequest $request, Post $announcement, PostComment $comment, UpdatePostComment $updatePostComment)
    {
        $updatePostComment->handle($comment, $request->validated());

        return redirect()->route('announcements.show', $comment->post);
    }

    public function destroy(Post $announcement, PostComment $comment, DeletePostComment $deletePostComment)
    {
        $deletePostComment->handle($comment);

        return redirect()->route('announcements.show', $announcement);
    }
}
