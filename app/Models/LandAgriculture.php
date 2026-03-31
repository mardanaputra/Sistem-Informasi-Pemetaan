<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandAgriculture extends Model
{
    protected $fillable = [
        'owner_name',
        'address',
        'location',
        'geom',
        'land_area',
        'image',
    ];

    protected $casts = [
        'location' => 'json',
        'geom' => 'json',
    ];
}
