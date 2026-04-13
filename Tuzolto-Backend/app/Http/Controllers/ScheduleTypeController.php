<?php

namespace App\Http\Controllers;

use App\Models\scheduleType;
use Illuminate\Http\Request;

class ScheduleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(scheduleType::all());
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
    public function show(scheduleType $scheduleType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(scheduleType $scheduleType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, scheduleType $scheduleType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = scheduleType::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
