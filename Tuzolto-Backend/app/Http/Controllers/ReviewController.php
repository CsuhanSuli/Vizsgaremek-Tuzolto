<?php

namespace App\Http\Controllers;

use App\Models\review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
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
            'reviewDate' => 'required',
            'isHappend' => 'required',
            'isSuccesfull' => 'required',
            'toolId' => 'required|exists:tools,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $newRecord = new review;
        $newRecord->name = $request->name;
        $newRecord->toolTypeId = $request->toolTypeId;
        $newRecord->placeId = $request->placeId;
        $newRecord->carId = $request->carId;
        $newRecord->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function allDates(int $toolId)
    {
        $data = review::find($toolId);
        if (empty($data)) {
            return response()->json(['message' => '404 nincs ijen vizsga'], 404);
        }

        return response()->json($data);
    }

    public function latestDate(int $toolId)
    {
        $data = review::find($toolId)->orderBy('reviewDate', 'desc')->limit(1);
        if (empty($data)) {
            return response()->json(['message' => '404 nincs ijen vizsga'], 404);
        }

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(review $review)
    {
        //
    }
}
