<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LandAgriculture;
use App\Models\River;
use App\Models\Subak;

class AgricultureSeeder extends Seeder
{
    public function run(): void
    {
        // Subak
        Subak::create([
            'subak_name' => 'Subak Tegal Sari',
            'address' => 'Tabanan, Bali',
            'location' => [
                115.11573598410536,
                -8.165565678898645
            ]
        ]);

        // River
        River::create([
            'river_name' => 'Aliran Sungai Tegal Sari',
            'length_m' => "850",
            'geom' => [
                "type" => "LineString",
                "coordinates" => [
                    [115.11559630529126, -8.165667166930618],
                    [115.11580168613688, -8.165832003596648],
                    [115.11597376198182, -8.16592266373398],
                    [115.11611253282257, -8.165991345642666],
                    [115.11631513825279, -8.16609574212086],
                    [115.11650109118176, -8.166169918549258],
                    [115.11670092119311, -8.166257831335358],
                    [115.11678140828218, -8.166381458657924],
                    [115.11688132328783, -8.166477613215875],
                    [115.11698956454495, -8.166546295029107],
                    [115.11713829332552, -8.166699081674693],
                    [115.1172718024963, -8.166868405550574]
                ]
            ]
        ]);

        // Land Agriculture
        LandAgriculture::create([
            'owner_name' => 'Made Sawit',
            'address' => 'Singaraja, Bali',
            'location' => [115.11498966847768, -8.166172452341257],
            'land_area' => 2500,
            'image' => 'https://infolelang.bpdbali.co.id/storage/lelang/sgw8HlX80TlfBRh4EkPbQSl1lLDbHbQhJNQZEXSh.jpg',
            'geom' => [
                "type" => "Polygon",
                "coordinates" => [
                    [
                        [115.11465613022887, -8.165917956811114],
                        [115.11459822428361, -8.166034887209449],
                        [115.11498966847768, -8.166172452341257],
                        [115.11524908711453, -8.166296260919196],
                        [115.11546218099522, -8.165690974173316],
                        [115.11498966847768, -8.165406672506322],
                        [115.11465613022887, -8.165917956811114]
                    ]
                ]
            ]
        ]);
    }
}
