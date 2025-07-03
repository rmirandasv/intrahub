<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        $posts = Post::query()
            ->with(relations: [
                'user',
                'category',
                'benefit' => fn ($benefit) => $benefit->chaperone(),
                'event' => fn ($event) => $event->chaperone(),
            ])
            ->when($request->has('category_id'), function ($query) use ($request) {
                $query->where('category_id', $request->category_id);
            })
            ->when($request->has('post_type'), function ($query) use ($request) {
                $query->where('post_type', $request->post_type);
            })
            ->when($request->has('search'), function ($query) use ($request) {
                $query->where('title', 'like', sprintf('%%%s%%', $request->search));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render(component: 'dashboard', props: [
            'categories' => $categories,
            'posts' => $posts,
        ]);
    }
}
