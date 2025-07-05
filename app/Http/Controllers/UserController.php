<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        $users = User::paginate(10);

        return Inertia::render(component: 'users/index', props: [
            'users' => $users
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render(component: 'users/show', props: [
            'user' => $user
        ]);
    }
}
