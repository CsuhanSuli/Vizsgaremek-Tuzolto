<?php

namespace App\Http\Controllers;

use App\Models\examUser;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(examUser $examUser)
    {
        //
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
