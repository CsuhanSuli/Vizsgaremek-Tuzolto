<?php

namespace App\Http\Controllers;

use App\Models\examType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(examType::all());
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
        $validator = Validator::make($request->all(), [
            'typeName' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $newRecord = new examType;
        $newRecord->typeName = $request->typeName;
        $newRecord->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(examType $examType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(examType $examType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, examType $examType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = examType::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
