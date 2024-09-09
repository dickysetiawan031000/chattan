<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('search')) {
            $search = $request->input('search');
            $friends = auth()->user()->friends()
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('username', 'like', "%$search%");
                })
                ->get();
        } else {
            $friends = auth()->user()->friends;
        }


        return inertia('Friends/Index', [
            'friends' => $friends,
        ]);
    }
}
