<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Subaks\CreateSubakRequest;
use App\Http\Requests\Subaks\UpdateSubakRequest;
use App\Models\Subak;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $query = Subak::query()->latest();

        if ($search) {
            $query->where('subak_name', 'like', '%' . $search . '%');
        }

        $subaks = $query->paginate($perpage)->appends(['search' => $search]);

        return Inertia::render('Backpage/Subak/Index', [
            'title' => 'Subak',
            'searchValue' => $search ?? '',
            'subaks' => $subaks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateSubakRequest $request)
    {
        try {
            $validated = $request->validated();

            $subak = Subak::create($validated);

            return ApiResponse::success($subak, 'Subak berhasil ditambahkan', 201);
        } catch (Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ],
                'Subak gagal ditambahkan',
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subak = Subak::findOrFail($id);

        return Inertia::render('Backpage/Subak/Show', [
            'title' => 'Detail Subak',
            'subak' => $subak,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubakRequest $request, string $id)
    {
        try {
            $validated = $request->validated();

            $subak = Subak::findOrFail($id);

            $subak->update($validated);

            return ApiResponse::success($subak, 'Subak berhasil diupdate', 200);
        } catch (Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ],
                'Subak gagal diupdate',
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $subak = Subak::findOrFail($id);

            $subak->delete();

            return ApiResponse::success(null, 'Subak berhasil dihapus', 200);
        } catch (Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ],
                'Subak gagal dihapus',
            );
        }
    }
}
