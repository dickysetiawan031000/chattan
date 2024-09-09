<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::get('/', HomeController::class);
    // Route::get('/search', [HomeController::class, 'search'])->name('search');
    // Route::get('/dashboard', HomeController::class)->name('dashboard');
    Route::get('/chat/{user:username}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chat/{user:username}', [ChatController::class, 'store'])->name('chats.store');

    Route::resource('friends', FriendshipController::class)->only(['index', 'store', 'destroy']);
});

require __DIR__.'/auth.php';
