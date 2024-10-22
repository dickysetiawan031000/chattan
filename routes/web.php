<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::get('/', HomeController::class);
    Route::get('/chat/{user:username}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chat/{user:username}', [ChatController::class, 'store'])->name('chats.store');

    Route::resource('friends', FriendshipController::class)->only(['index', 'store', 'destroy']);
    Route::resource('friend-request', FriendRequestController::class)->only(['index', 'store', 'destroy']);
    Route::get('friend-request/accept/{user:username}', [FriendRequestController::class, 'acceptFriendRequest'])->name('friend.accept');
    // Route::get('friend-request/mark-as-read', [FriendRequestController::class, 'markAsRead'])->name('friend-request.mark-as-read');
    Route::get('friend-request/count', [FriendRequestController::class, 'countUnreadFriendRequests'])->name('friend-request.count');
});

require __DIR__.'/auth.php';
