<?php

namespace App\Http\Controllers;

use App\Models\examType;
use Illuminate\Http\Request;

class ExamTypeController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(examType $examType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(examType $examType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, examType $examType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(examType $examType)
    {
        //
    }
}
