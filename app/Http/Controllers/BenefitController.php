<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateBenefit;
use App\Actions\Post\UpdateBenefit;
use App\Http\Requests\StoreBenefitRequest;
use App\Http\Requests\UpdateBenefitRequest;
use App\Models\Benefit;
use App\Models\Category;
use Inertia\Inertia;

class BenefitController extends Controller
{
    public function index()
    {
        $benefits = Benefit::with('post', 'post.category')->paginate(10);
        return Inertia::render(component: 'benefits/index', props: [
            'benefits' => $benefits,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render(component: 'benefits/create', props: [
            'categories' => $categories,
        ]);
    }

    public function store(StoreBenefitRequest $request, CreateBenefit $createBenefit)
    {
        $createBenefit->handle($request->user(), $request->validated());

        return redirect()->route('benefits.index');
    }

    public function edit(Benefit $benefit)
    {
        $benefit->load('post', 'post.category');
        $categories = Category::all();
        
        return Inertia::render(component: 'benefits/edit', props: [
            'benefit' => $benefit,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateBenefitRequest $request, Benefit $benefit, UpdateBenefit $updateBenefit)
    {
        $updateBenefit->handle($benefit, $request->validated());

        return redirect()->route('benefits.index');
    }
}
