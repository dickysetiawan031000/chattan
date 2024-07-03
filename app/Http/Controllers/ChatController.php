<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        $chats = Chat::where(
            fn ($q) => $q->where('sender_id', Auth::id())
                ->where('receiver_id', $user->id)
        )->orWhere(
            fn ($q) => $q->where('sender_id', $user->id)
                ->where('receiver_id', Auth::id())
        )
        ->orderBy('created_at', 'asc')
        ->get();

        return inertia('Chats/Show', [
            'user' => $user,
            'chats' => $chats,
        ]);
    }

    public function store(User $user, Request $request)
    {
        $request->validate([
            'message' => 'required',
        ]);

        $chat = Auth::user()->chats()->create([
            'message' => $request->message,
            'receiver_id' => $user->id,
        ]);

        broadcast(new MessageSent($chat->load('receiver')))->toOthers();

        return back();
    }
}
