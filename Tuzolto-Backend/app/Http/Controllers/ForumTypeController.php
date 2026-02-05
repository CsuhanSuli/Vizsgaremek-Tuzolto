<?php

namespace App\Http\Controllers;

use App\Models\forumType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ForumTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(forumType::all());
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
                "typeName"=> "required",

        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new forumType();
        $newRecord->typeName=$request->typeName;
        $newRecord->save();
        return response()->json(["message"=>"sikeres feltöltés"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(forumType $forumType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(forumType $forumType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, forumType $forumType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(forumType $forumType)
    {
        //
    }
}
