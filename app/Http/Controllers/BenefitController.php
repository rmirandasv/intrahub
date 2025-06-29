<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreateBenefit;
use App\Http\Requests\StoreBenefitRequest;
use App\Models\Benefit;
use App\Models\Category;
use Inertia\Inertia;

class BenefitController extends Controller
{
    public function index()
    {
        $benefits = Benefit::with('post')->get();
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
}
