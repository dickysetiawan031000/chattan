<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Dicky Setiawan',
                'username' => 'dicky.setiawan',
                'email' => 'dickysetiawan@mail.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Zaqi Setiawan',
                'username' => 'zaqi.setiawan',
                'email' => 'zaqisetiawan@mail.com',
                'password' => bcrypt('password'),
            ]
        ])->each(fn ($user) => User::create($user));

        \App\Models\User::factory(10)->create();
        $this->call(FriendshipSeeder::class);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
