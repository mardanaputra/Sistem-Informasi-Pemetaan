<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class River extends Model
{
    protected $fillable = [
        'river_name',
        'length_m',
        'geom',
    ];

    protected $casts = [
        'geom' => 'json',
    ];
}
