<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateEvent;
use App\Actions\Post\DeleteEvent;
use App\Actions\Post\UpdateEvent;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Category;
use App\Models\Event;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Event::class);

        $events = Event::with('post', 'post.category')->paginate(10);

        return Inertia::render(component: 'events/index', props: [
            'events' => $events,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Event::class);

        $categories = Category::all();

        return Inertia::render(component: 'events/create', props: [
            'categories' => $categories,
        ]);
    }

    public function store(StoreEventRequest $request, CreateEvent $createEvent)
    {
        Gate::authorize('create', Event::class);

        $createEvent->handle($request->user(), $request->validated());

        return redirect()->route('events.index');
    }

    public function show(Event $event)
    {
        Gate::authorize('view', $event);

        $event->load('post', 'post.category');

        return Inertia::render(component: 'events/show', props: [
            'event' => $event,
        ]);
    }

    public function edit(Event $event)
    {
        Gate::authorize('update', $event);

        $event->load('post', 'post.category');

        $categories = Category::all();

        return Inertia::render(component: 'events/edit', props: [
            'event' => $event,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event, UpdateEvent $updateEvent)
    {
        Gate::authorize('update', $event);

        $updateEvent->handle($event, $request->validated());

        return redirect()->route('events.index');
    }

    public function destroy(Event $event, DeleteEvent $deleteEvent)
    {
        Gate::authorize('delete', $event);

        $deleteEvent->handle($event);

        return redirect()->route('events.index');
    }
}
