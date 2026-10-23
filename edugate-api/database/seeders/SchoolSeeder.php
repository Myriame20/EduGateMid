<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\School;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        School::create([
            'name' => 'École Internationale de Libreville',
            'city' => 'Libreville',
            'type' => 'private',
            'address' => 'Centre-ville',
            'email' => 'contact@ecole-test.ga',
            'phone' => '060000000',
            'is_active' => true,
        ]);

        School::create([
            'name' => 'École Publique de Nzeng-Ayong',
            'city' => 'Libreville',
            'type' => 'public',
            'address' => 'Nzeng-Ayong',
            'email' => null,
            'phone' => null,
            'is_active' => true,
        ]);
    }
}