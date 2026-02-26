<?php

namespace App\Http\Controllers;

use App\Models\schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(schedule::with("users")->with("schedule_types")->get());
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
                "scheduleTypeid"=> "required|exists:schedule_types,id",
                "userId"=> "required|exists:users,id",
                "date"=> "required|",
        ]);
        if($validator->fails())
            {
                return response()->json(["message"=>"hiba","hibák"=>$validator->errors()],402);
            }
        $newRecord = new Schedule();
        $newRecord->scheduleTypeid=$request->scheduleTypeid;
        $newRecord->date=$request->date;
        $newRecord->userId=$request->userId;

        $newRecord->save();
        return response()->json(["message"=>"sikeres feltöltés"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(schedule $schedule)
    {
        //
    }
}
