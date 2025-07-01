<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateBenefit;
use App\Actions\Post\DeleteBenefit;
use App\Actions\Post\UpdateBenefit;
use App\Http\Requests\StoreBenefitRequest;
use App\Http\Requests\UpdateBenefitRequest;
use App\Models\Benefit;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BenefitController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Benefit::class);

        $benefits = Benefit::with('post', 'post.category')->paginate(10);

        return Inertia::render(component: 'benefits/index', props: [
            'benefits' => $benefits,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Benefit::class);

        $categories = Category::all();

        return Inertia::render(component: 'benefits/create', props: [
            'categories' => $categories,
        ]);
    }

    public function show(Benefit $benefit)
    {
        Gate::authorize('view', $benefit);

        $benefit->load('post', 'post.category', 'post.user', 'post.comments.user');

        return Inertia::render(component: 'benefits/show', props: [
            'benefit' => $benefit,
        ]);
    }

    public function store(StoreBenefitRequest $request, CreateBenefit $createBenefit)
    {
        Gate::authorize('create', Benefit::class);

        $createBenefit->handle($request->user(), $request->validated());

        return redirect()->route('benefits.index');
    }

    public function edit(Benefit $benefit)
    {
        Gate::authorize('update', $benefit);

        $benefit->load('post', 'post.category');

        $categories = Category::all();

        return Inertia::render(component: 'benefits/edit', props: [
            'benefit' => $benefit,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateBenefitRequest $request, Benefit $benefit, UpdateBenefit $updateBenefit)
    {
        Gate::authorize('update', $benefit);

        $updateBenefit->handle($benefit, $request->validated());

        return redirect()->route('benefits.index');
    }

    public function destroy(Benefit $benefit, DeleteBenefit $deleteBenefit)
    {
        Gate::authorize('delete', $benefit);

        $deleteBenefit->handle($benefit);

        return redirect()->route('benefits.index');
    }
}
