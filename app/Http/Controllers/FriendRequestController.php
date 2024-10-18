<?php

namespace App\Http\Controllers;

use App\Events\AddFriendSent;
use App\Http\Requests\Friend\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;

class FriendRequestController extends Controller
{
    public function index()
    {
        $friendRequests = auth()->user()->friendRequests;

        return inertia('FriendRequest/Index', [
            'friendRequests' => $friendRequests,
        ]);
    }

    public function store(Request $request)
    {

        try {
            $usernameOrEmail = $request->input('username');
            $authUser = auth()->user();

            // Find the user by username or email
            $user = User::where('username', $usernameOrEmail)
                ->orWhere('email', $usernameOrEmail)
                ->firstOrFail();


            // Check if the user is already a friend
            $friendship = $authUser->friends()->where('friend_id', $user->id)->exists();

            if ($friendship) {
                throw new \Exception("User with username or email {$usernameOrEmail} is already your friend.");
            }

            // Check if a pending friend request already exists
            $friendRequest = $authUser->friendRequestsSent()
                ->where('receiver_id', $user->id)
                ->where('status', 'pending')
                ->exists();

            if ($friendRequest) {
                throw new \Exception("You have already sent a friend request to {$usernameOrEmail}.");
            }

            // Send the friend request
            $authUser->friendRequests()->attach($user, [
                'sender_id' => $authUser->id,
                'receiver_id' => $user->id,
            ]);

            // count friend requests where is read is false
            $friendRequestsCount = $user->countUnreadFriendRequests();

            // send notification to the user
            broadcast(new AddFriendSent($friendRequestsCount))->toOthers();

            return back()->with('status', 'success')
                ->with('message', 'Friend request sent.');
        } catch (\Throwable $th) {
            return back()->with('status', $status ?? 'error')
                ->with('message', $th->getMessage());
        }
    }

    public function acceptFriendRequest(User $user)
    {
        try {
            $friendRequest = auth()->user()->friendRequests()
                ->where('sender_id', $user->id)
                ->where('status', 'pending')
                ->first();

            if (!$friendRequest) {
                throw new \Exception('Friend request not found.');
            }

            // Add the user as a friend in friendships table
            auth()->user()->friends()->attach($user, [
                'status' => 'accepted',
            ]);

            $user->friends()->attach(auth()->user(), [
                'status' => 'accepted',
            ]);

            // Update the friend request status
            $friendRequest->pivot->update([
                'status' => 'accepted',
            ]);

            return back()->with([
                'status' => 'success',
                'message' => 'Friend request accepted.',
            ]);
        } catch (\Throwable $th) {
            return back()->with([
                'status' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }
}
