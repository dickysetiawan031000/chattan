<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                // 'totalFriendRequests' =>  $request->user() ? $request->user()->friendRequests()
                //     ->where('is_read', false)
                //     ->count() : 0,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'users' => fn() => $request->user() ? User::where('id', '!=', $request->user()->id)->get() : null,
            'filters' => [
                ...$request->query(),
            ],
            'flash' => [
                'status' => fn() => $request->session()->get('status'),
                'message' => fn() => $request->session()->get('message'),
            ],
        ]);
    }
}
