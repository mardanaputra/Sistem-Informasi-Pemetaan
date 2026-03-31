<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subak extends Model
{
    protected $fillable = [
        'subak_name',
        'address',
        'location'
    ];

    protected $casts = [
        'location' => 'json',
    ];
}
