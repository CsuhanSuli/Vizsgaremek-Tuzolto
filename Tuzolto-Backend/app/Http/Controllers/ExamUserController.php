<?php

namespace App\Http\Controllers;

use App\Models\examUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(examUser::with("exams")->with("users")->get());
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
                "examDate"=> "required|before:today",
                "examId"=> "required|exists:exams,id",
                "userId"=> "required|exists:users,id",
        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new examUser();
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
    public function show(int $UserId)
    {
        $data = examUser::where("userId",$UserId)->get();
        if(empty($data))
            {
                return response()->json(["message"=>"404 nincs ijen vizsga"],404);
            }
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(examUser $examUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, examUser $examUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(examUser $examUser)
    {
        //
    }
}
