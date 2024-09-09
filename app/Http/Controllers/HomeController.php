<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // return inertia('Home');
        return inertia('Dashboard');
    }

    // public function search (Request $request)
    // {

    //     $search = $request->input('search');
    //     dd($search);

    //     $users = User::where('username', 'like', "%$search%")
    //         ->orWhere('name', 'like', "%$search%")
    //         ->get();

    //     return response()->json($users);
    // }
}
