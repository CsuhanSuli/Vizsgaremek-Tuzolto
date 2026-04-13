<?php

namespace App\Http\Controllers;

use App\Models\cartype;
use Illuminate\Http\Request;

class CartypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(cartype::all());
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(cartype $cartype)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cartype $cartype)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cartype $cartype)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = cartype::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
