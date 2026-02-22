<?php

namespace App\Http\Controllers;

use App\Models\exams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(exams::all());
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
                "examType"=> "required|exists:exam_types,id",
        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new exams();
        $newRecord->name=$request->name;
        $newRecord->examType=$request->examType;
        $newRecord->save();
        return response()->json(["message"=>"sikeres feltöltés"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(exams $exams)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(exams $exams)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, exams $exams)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(exams $exams)
    {
        //
    }
}
