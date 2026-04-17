<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Forum::with('forumType')->orderByDesc('date')->get());
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
            'header' => 'required',
            'date' => 'required',
            'typeId' => 'required|exists:forum_Types,id',
            'place' => 'required',
            'description' => 'required',
            'imageName' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $newRecord = new Forum;
        $newRecord->header = $request->header;
        $newRecord->date = $request->date;
        $newRecord->typeId = $request->typeId;
        $newRecord->place = $request->place;
        $newRecord->description = $request->description;
        $newRecord->imageName = $request->imageName;
        $newRecord->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Forum $forum)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Forum $forum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data = Forum::find($id);
        if (empty($data)) {
            return response()->json(['message' => 'nincs kocsi ijen idével'], 404);
        }
        $validator = Validator::make($request->all(), [
            'header' => 'required',
            'date' => 'required',
            'typeId' => 'required|exists:forum_Types,id',
            'place' => 'required',
            'description' => 'required',
            'imageName' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $data->header = $request->header;
        $data->date = $request->date;
        $data->typeId = $request->typeId;
        $data->place = $request->place;
        $data->description = $request->description;
        $data->imageName = $request->imageName;
        $data->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = Forum::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
