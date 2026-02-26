<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Car::with("cartypes")->get());
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
                "typeId"=> "required|exists:cartypes,id",
                "imageName"=> "required",
        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new Car();
        $newRecord->name=$request->name;
        $newRecord->typeId=$request->typeId;
        $newRecord->imageName=$request->imageName;
        $newRecord->save();
        return response()->json(["message"=>"sikeres feltöltés"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
    }
}
