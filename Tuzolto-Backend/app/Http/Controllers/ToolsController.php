<?php

namespace App\Http\Controllers;

use App\Models\tools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ToolsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                "name"=> "required",
                "toolTypeId"=> "required|exists:tool_types,id",
                "placeId"=> "required|exists:car_places,id",
                "carId"=> "required|exists:cars,id",
        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new tools();
        $newRecord->name=$request->name;
        $newRecord->toolTypeId=$request->toolTypeId;
        $newRecord->placeId=$request->placeId;
        $newRecord->carId=$request->carId;
        $newRecord->save();
        return response()->json(["message"=>"sikeres feltöltés"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = tools::where("carId","=",$id)->with("carPlace")->get();
        if(empty($data))
        {
            return response()->json(["message"=>"404 nincs ijen kocsi"],404);
        }
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tools $tools)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tools $tools)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tools $tools)
    {
        //
    }
}
