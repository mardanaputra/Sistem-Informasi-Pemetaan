<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontpageController extends Controller
{
    public function index()
    {
        return Inertia::render('Frontpage/Index', [
            'title' => 'Home',
        ]);
    }

    public function mapsStatic()
    {
        return Inertia::render('Frontpage/MapsStatic', [
            'title' => 'Maps Static',
        ]);
    }
}
