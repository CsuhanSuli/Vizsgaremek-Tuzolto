<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ExamUserController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\ForumTypeController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\isAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//user
Route::post('/user/register', [UserController::class, 'register']);
Route::post('/user/login', [UserController::class, 'login']) ->name('login');


//forum
Route::get("/forum/get",[ForumController::class,"index"]);


Route::get("/tools/show/{id}",[ToolsController::class,"show"]);
//cars
Route::get("/car/get",[CarController::class,"index"]);

Route::middleware('auth:sanctum')->group(function () {
    //user
    Route::post('/user/logout', [UserController::class, 'logout']);
    //forum
    Route::post("/forum/store",[ForumController::class,"store"])->middleware(isAdmin::class);
    Route::post("/forumType/store",[ForumTypeController::class,"store"])->middleware(isAdmin::class);
});
