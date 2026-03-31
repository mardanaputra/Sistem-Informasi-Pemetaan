<?php

namespace App\Http\Controllers;

use App\Models\LandAgriculture;
use App\Models\River;
use App\Models\Subak;
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

    public function mapsDynamic()
    {
        $subaks = Subak::all();
        $rivers = River::all();
        $landAgricultures = LandAgriculture::all();

        return Inertia::render('Frontpage/MapsDynamic', [
            'title' => 'Maps Dynamic',
            'subaks' => $subaks,
            'rivers' => $rivers,
            'landAgricultures' => $landAgricultures
        ]);
    }
}
