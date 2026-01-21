<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', action: [UserController::class, 'register']);


Route::post('/login', [UserController::class, 'login']) ->name('login');

Route::get("/forum/get",[ForumController::class,"index"]);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
});
