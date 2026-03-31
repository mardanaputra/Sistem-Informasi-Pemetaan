<?php

use App\Http\Controllers\FrontpageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubakController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Catch-all route to handle 404 errors
Route::fallback(function () {
    return Inertia::render('Error/Error', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});

// frontpage
Route::get('/', [FrontpageController::class, 'index'])->name('frontpage.home');
Route::get('/maps-static', [FrontpageController::class, 'mapsStatic'])->name('frontpage.maps-static');
Route::get('/maps-dynamic', [FrontpageController::class, 'mapsDynamic'])->name('frontpage.maps-dynamic');

// backpage
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Backpage/Dashboard/Index', [
            'title' => 'Dashboard',
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/{userId}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('subaks', SubakController::class);
});

require __DIR__ . '/auth.php';
