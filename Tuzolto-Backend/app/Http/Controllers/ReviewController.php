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
        $newRecord->reviewDate = $request->reviewDate;
        $newRecord->isHappend = $request->isHappend;
        $newRecord->isSuccesfull = $request->isSuccesfull;
        $newRecord->toolId = $request->toolId;
        $newRecord->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function allDates(int $toolId)
    {
        $data = review::where('toolId', $toolId)->get();
        if (empty($data)) {
            return response()->json(['message' => '404 nincs ijen vizsga'], 404);
        }

        return response()->json($data);
    }

    public function latestDate(int $toolId)
    {
        $data = review::where('toolId', $toolId)
            ->orderBy('reviewDate', 'desc')
            ->first();

        if (! $data) {
            return response()->json(['message' => 'Nincs ilyen vizsga'], 404);
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

    public function isHappend(int $id)
    {
        $data = review::find($id);
        if (empty($data)) {
            return response()->json(['message' => '404'], 404);
        }
        if ($data->isHappend == 0) {
            $data->isHappend = 1;
            $data->save();

            return response()->json(['message' => 'sikeresen szerkeszteted a isHappendet true ra']);
        } else {
            $data->isHappend = 0;
            $data->save();

            return response()->json(['message' => 'sikeresen szerkeszteted a isHappendet flase ra']);
        }
    }

    public function isSuccesfull(int $id)
    {
        $data = review::find($id);
        if (empty($data)) {
            return response()->json(['message' => '404'], 404);
        }
        if ($data->isSuccesfull == 0) {
            $data->isSuccesfull = 1;
            $data->save();

            return response()->json(['message' => 'sikeresen szerkeszteted a isSuccesfult true ra']);
        } else {
            $data->isSuccesfull = 0;
            $data->save();

            return response()->json(['message' => 'sikeresen szerkeszteted a isSuccesfult flase ra']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data = review::find($id);
        if (empty($data)) {
            return response()->json(['message' => '404'], 404);
        }
        $validator = Validator::make($request->all(), [
            'reviewDate' => 'required',
            'isHappend' => 'required',
            'isSuccesfull' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $data->reviewDate = $request->reviewDate;
        $data->isHappend = $request->isHappend;
        $data->isSuccesfull = $request->isSuccesfull;
        $data->save();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = review::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
