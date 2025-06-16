<?php

use App\Http\Controllers\AnnouncementController;
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
        '/announcements/{announcement}',
        [AnnouncementController::class, 'show']
    )->name('announcements.show');

    Route::get(
        '/announcements/create',
        [AnnouncementController::class, 'create']
    )->name('announcements.create');

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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
