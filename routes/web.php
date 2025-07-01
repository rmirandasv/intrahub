<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BenefitController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostLikeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get(
        '/announcements',
        [AnnouncementController::class, 'index']
    )->name('announcements.index');

    Route::get(
        '/announcements/create',
        [AnnouncementController::class, 'create']
    )->name('announcements.create');

    Route::get(
        '/announcements/{announcement}',
        [AnnouncementController::class, 'show']
    )->name('announcements.show');

    Route::get(
        '/announcements/{announcement}/edit',
        [AnnouncementController::class, 'edit']
    )->name('announcements.edit');

    Route::post(
        '/announcements',
        [AnnouncementController::class, 'store']
    )->name('announcements.store');

    Route::put(
        '/announcements/{announcement}',
        [AnnouncementController::class, 'update']
    )->name('announcements.update');

    Route::delete(
        '/announcements/{announcement}',
        [AnnouncementController::class, 'destroy']
    )->name('announcements.destroy');

    Route::post(
        '/announcements/{announcement}/comments',
        [PostCommentController::class, 'store']
    )->name('announcements.comments.store');

    Route::put(
        '/announcements/{announcement}/comments/{comment}',
        [PostCommentController::class, 'update']
    )->name('announcements.comments.update');

    Route::delete(
        '/announcements/{announcement}/comments/{comment}',
        [PostCommentController::class, 'destroy']
    )->name('announcements.comments.destroy');

    Route::post(
        '/posts/{post}/like',
        [PostLikeController::class, 'toggle']
    )->name('posts.like.toggle');

    Route::get(
        '/categories',
        [CategoryController::class, 'index']
    )->name('categories.index');

    Route::get(
        '/categories/create',
        [CategoryController::class, 'create']
    )->name('categories.create');

    Route::get(
        '/categories/{category}/edit',
        [CategoryController::class, 'edit']
    )->name('categories.edit');

    Route::post(
        '/categories',
        [CategoryController::class, 'store']
    )->name('categories.store');

    Route::put(
        '/categories/{category}',
        [CategoryController::class, 'update']
    )->name('categories.update');

    Route::delete(
        '/categories/{category}',
        [CategoryController::class, 'destroy']
    )->name('categories.destroy');

    Route::get(
        '/benefits',
        [BenefitController::class, 'index']
    )->name('benefits.index');

    Route::get(
        '/benefits/create',
        [BenefitController::class, 'create']
    )->name('benefits.create');

    Route::get(
        '/benefits/{benefit}',
        [BenefitController::class, 'show']
    )->name('benefits.show');

    Route::post(
        '/benefits',
        [BenefitController::class, 'store']
    )->name('benefits.store');

    Route::get(
        '/benefits/{benefit}/edit',
        [BenefitController::class, 'edit']
    )->name('benefits.edit');

    Route::put(
        '/benefits/{benefit}',
        [BenefitController::class, 'update']
    )->name('benefits.update');

    Route::delete(
        '/benefits/{benefit}',
        [BenefitController::class, 'destroy']
    )->name('benefits.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
