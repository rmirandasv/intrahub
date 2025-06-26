<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateAnnouncement;
use App\Actions\Post\DeletePost;
use App\Actions\Post\UpdateAnnouncement;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnounementRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Post::class);

        $user = Auth::user();

        $announcements = Post::query()
            ->with(relations: ['user', 'category'])
            ->announcements()
            ->withCount('likes')
            ->when($user, function ($query) use ($user) {
                $query->addSelect([
                    'is_liked' => function ($query) use ($user) {
                        $query->selectRaw('COUNT(*) > 0')
                            ->from('post_likes')
                            ->whereColumn('post_likes.post_id', 'posts.id')
                            ->where('post_likes.user_id', $user->id);
                    },
                ]);
            })
            ->when(! $user, function ($query) {
                $query->addSelect(DB::raw('0 as is_liked'));
            })
            ->paginate(10);

        return Inertia::render(component: 'announcements/index', props: [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Post::class);

        $categories = Category::all();

        return Inertia::render(component: 'announcements/create', props: [
            'categories' => $categories,
        ]);
    }

    public function store(StoreAnnouncementRequest $request, CreateAnnouncement $createAnnouncement)
    {
        Gate::authorize('create', Post::class);

        $createAnnouncement->handle(Auth::user(), $request->validated());

        return redirect()->route('announcements.index');
    }

    public function edit(Post $announcement)
    {
        Gate::authorize('update', $announcement);

        $categories = Category::all();

        return Inertia::render(component: 'announcements/edit', props: [
            'announcement' => $announcement->load(relations: ['category']),
            'categories' => $categories,
        ]);
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
