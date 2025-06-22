<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateAnnouncement;
use App\Actions\Post\DeletePost;
use App\Actions\Post\UpdateAnnouncement;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnounementRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Post::class);

        $announcements = Post::query()
            ->with(relations: ['user'])
            ->announcements()
            ->paginate(10);

        return Inertia::render(component: 'announcements/index', props: [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Post::class);

        return Inertia::render('announcements/create');
    }

    public function store(StoreAnnouncementRequest $request, CreateAnnouncement $createAnnouncement)
    {
        Gate::authorize('create', Post::class);

        $createAnnouncement->handle(Auth::user(), $request->validated());

        return redirect()->route('announcements.index');
    }

    public function show(Post $announcement)
    {
        Gate::authorize('view', $announcement);

        return Inertia::render('announcements/show', ['announcement' => $announcement]);
    }

    public function edit(Post $announcement)
    {
        Gate::authorize('update', $announcement);

        return Inertia::render('announcements/edit', ['announcement' => $announcement]);
    }

    public function update(UpdateAnnounementRequest $request, Post $announcement, UpdateAnnouncement $updateAnnouncement)
    {
        Gate::authorize('update', $announcement);

        $updateAnnouncement->handle($announcement, $request->validated());

        return redirect()->route('announcements.index');
    }

    public function destroy(Post $announcement, DeletePost $deletePost)
    {
        Gate::authorize('delete', $announcement);

        $deletePost->handle($announcement);

        return redirect()->route('announcements.index');
    }
}
