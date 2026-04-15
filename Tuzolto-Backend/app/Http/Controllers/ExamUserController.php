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
        return response()->json(examUser::with('exams')->with('users')->get());
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
            'examDate' => 'required|before:today',
            'examId' => 'required|exists:exams,id',
            'userId' => 'required|exists:users,id',
            'wasSuccesful' => 'required|',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $newRecord = new examUser;
        $newRecord->examDate = $request->examDate;
        $newRecord->examId = $request->examId;
        $newRecord->userId = $request->userId;
        $newRecord->wasSuccesful = $request->wasSuccesful;
        $newRecord->save();

        return response()->json(['message' => 'sikeres feltöltés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $UserId)
    {
        $data = examUser::with('exams')->where('userId', $UserId)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => '404 nincs ijen vizsga'], 404);
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
    public function update(Request $request, string $id)
    {
        $data = examUser::find($id);
        if (empty($data)) {
            return response()->json(['message' => 'nincs kocsi ijen idével'], 404);
        }
        $validator = Validator::make($request->all(), [
            'examDate' => 'required|before:today',
            'examId' => 'required|exists:exams,id',
            'wasSuccesful' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 422);
        }
        $data->examDate = $request->examDate;
        $data->examId = $request->examId;
        $data->wasSuccesful = $request->wasSuccesful;
        $data->save();

        return response()->json(['message' => 'sikeres feltöltés'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $data = examUser::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }
}
