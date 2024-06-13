<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function show(User $user)
    {
        return inertia('Chats/Show', [
            'user' => $user,
        ]);
    }

}
