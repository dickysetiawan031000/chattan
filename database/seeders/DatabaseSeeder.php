<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
                'name' => 'Dicky',
                'username' => 'dicky',
                'email' => 'dicky@mail.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Setiawan',
                'username' => 'setiawan',
                'email' => 'setiawan@mail.com',
                'password' => bcrypt('password'),
            ]
        ])->each(fn ($user) => User::create($user));

        \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
