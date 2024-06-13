<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        return inertia('Chats/Show', [
            'user' => $user,
        ]);
    }

    public function store(User $user, Request $request)
    {
        $request->validate([
            'message' => 'required',
        ]);

        Auth::user()->chats()->create([
            'message' => $request->message,
            'receiver_id' => $user->id,
        ]);

        return back();
    }

}
