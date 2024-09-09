<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FriendshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            // Ambil teman secara acak dari pengguna lain
            $friends = $users->except($user->id)->random(rand(1, 11));

            foreach ($friends as $friend) {
                // Periksa apakah kombinasi user_id dan friend_id sudah ada
                $exists = DB::table('friendships')
                    ->where(function ($query) use ($user, $friend) {
                        $query->where('user_id', $user->id)
                            ->where('friend_id', $friend->id);
                    })
                    ->orWhere(function ($query) use ($user, $friend) {
                        $query->where('user_id', $friend->id)
                            ->where('friend_id', $user->id);
                    })
                    ->exists();

                // Jika tidak ada, tambahkan kedua arah pertemanan
                if (!$exists) {
                    DB::table('friendships')->insert([
                        'user_id' => $user->id,
                        'friend_id' => $friend->id,
                        'status' => 'accepted',
                        'requested_by' => $user->id,
                        'accepted_by' => $friend->id,
                        'accepted_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    DB::table('friendships')->insert([
                        'user_id' => $friend->id,
                        'friend_id' => $user->id,
                        'status' => 'accepted',
                        'requested_by' => $friend->id,
                        'accepted_by' => $user->id,
                        'accepted_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
