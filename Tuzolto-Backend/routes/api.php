<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\CarPlaceController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\ExamTypeController;
use App\Http\Controllers\ExamUserController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\ForumTypeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\isAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// user
Route::get('/user/index', [UserController::class, 'index']);
Route::post('/user/register', [UserController::class, 'register']);

Route::post('/user/login', [UserController::class, 'login'])->name('login');

// forum
Route::get('/forum/get', [ForumController::class, 'index']);

// cars
Route::get('/car/get', [CarController::class, 'index']);

// thing that should be used with loging go here for testing

// exam
Route::get('/examUser/show/{id}', [ExamUserController::class, 'show']);
Route::get('/examUser/index', [ExamUserController::class, 'index']);
Route::post('/examUser/store', [ExamUserController::class, 'store']);
Route::post('/exams/store', [ExamsController::class, 'store']);
// examType
Route::get('/examType/index', [ExamTypeController::class, 'index']);

// tools
Route::post('/tools/store', [ToolsController::class, 'store']);
Route::get('/tools/show/{id}', [ToolsController::class, 'show']);

// cars
Route::post('/car/store', [CarController::class, 'store']);
Route::delete('/car/delete/{id}', [CarController::class, 'destroy']);
// carplace
Route::get('/carplace/index', [CarPlaceController::class, 'index']);

// schedules
Route::get('/schedule/index', [ScheduleController::class, 'index']);
Route::post('/schedule/store', [ScheduleController::class, 'store']);
// user

Route::delete('/user/delete/{id}', [UserController::class, 'destroy']);
// forum
Route::post('/forum/store', [ForumController::class, 'store'])->middleware(isAdmin::class);
Route::delete('/forum/delete/{id}', [ForumController::class, 'destroy']);
Route::post('/forumType/store', [ForumTypeController::class, 'store'])->middleware(isAdmin::class);
//review
Route::get("/review/allDates/{toolId}",[ReviewController::class,"allDates"]);
Route::get("/review/latestDate/{toolId}",[ReviewController::class,"latestDate"]);
Route::get("/review/store/{toolId}",[ReviewController::class,"store"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/logout', [UserController::class, 'logout']);
});
