<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('search')) {
            $search = $request->input('search');
            $friends = auth()->user()->friends()
                // ->wherePivot('status', 'accepted')
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

    public function store(Request $request)
    {
        try {
            $friend = User::where('username', $request->input('username'))
                ->orWhere('email', $request->input('username'))
                ->first();

            if (!$friend) {
                throw new \Exception('Username or email not found.');
            }

            $existingFriendship = auth()->user()->friends()
                ->where('friend_id', $friend->id)
                ->first();

            if ($existingFriendship) {
                if ($existingFriendship->pivot->status === 'accepted') {
                    throw new \Exception("User with username or email {$friend->username} is already your friend.");
                } elseif ($existingFriendship->pivot->status === 'pending') {
                    throw new \Exception("You have already added {$friend->username}.");
                }
            }

            auth()->user()->friends()->attach($friend, [
                'requested_by' => auth()->id(),
            ]);

            return back()->with([
                'status' => 'success',
                'message' => 'Friend request sent.',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'status' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function friendRequest()
    {
        $friendRequests = auth()->user()->friendRequests;

        return inertia('Friends/Requests', [
            'friendRequests' => $friendRequests,
        ]);
    }

    public function acceptFriendRequest(User $user)
    {
        dd($user);
        $friendship = auth()->user()->friendRequests()
            ->where('user_id', $user->id)
            ->first();

        if (!$friendship) {
            return back()->with([
                'status' => 'error',
                'message' => 'Friend request not found.',
            ]);
        }

        $friendship->pivot->update([
            'status' => 'accepted',
            'accepted_by' => auth()->id(),
            'accepted_at' => now(),
        ]);

        return back()->with([
            'status' => 'success',
            'message' => 'Friend request accepted.',
        ]);
    }
}
