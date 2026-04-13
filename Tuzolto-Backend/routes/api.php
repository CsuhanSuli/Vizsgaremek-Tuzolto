<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\CarPlaceController;
use App\Http\Controllers\CartypeController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\ExamTypeController;
use App\Http\Controllers\ExamUserController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\ForumTypeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ScheduleTypeController;
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
    
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/logout', [UserController::class, 'logout']);


    // exam
    Route::get('/examUser/show/{id}', [ExamUserController::class, 'show']);
    Route::get('/examUser/index', [ExamUserController::class, 'index']);
    Route::get('/exam/index', [ExamsController::class, 'index']);
    Route::post('/examUser/store', [ExamUserController::class, 'store']);
    Route::get('/exams/index', [ExamsController::class, 'index']);
    Route::post('/exams/store', [ExamsController::class, 'store']);
    Route::delete('/examUser/delete/{id}', [ExamUserController::class, 'destroy']);
    // examType
    Route::get('/examType/index', [ExamTypeController::class, 'index']);
    Route::delete('/examType/delete/{id}', [ExamTypeController::class, 'destroy']);
    Route::post('/examType/store', [ExamTypeController::class, 'store']);

    // tools
    Route::post('/tools/store', [ToolsController::class, 'store']);
    Route::get('/tools/show/{id}', [ToolsController::class, 'show']);
    Route::put('/tools/put/{id}', [ToolsController::class, 'update']);
    Route::delete('/tools/delete/{id}', [ToolsController::class, 'destroy']);

    // cars
    Route::post('/car/store', [CarController::class, 'store']);
    Route::delete('/car/delete/{id}', [CarController::class, 'destroy']);
    Route::put('/car/put/{id}', [CarController::class, 'update']);
    // cartype
    Route::get('/cartype/index', [CartypeController::class, 'index']);
    Route::delete('/cartype/delete', [CartypeController::class, 'destroy']);
    // carplace
    Route::get('/carplace/index', [CarPlaceController::class, 'index']);
    // schedules
    Route::get('/schedule/index', [ScheduleController::class, 'index']);
    Route::post('/schedule/store', [ScheduleController::class, 'store']);
    Route::put('/schedule/put/{id}', [ScheduleController::class, 'update']);
    Route::delete('/schedule/delete/{id}', [ScheduleController::class, 'destroy']);
    // schedule_types
    Route::get('/schedule_types', [ScheduleTypeController::class, 'index']);
    // user
    Route::put('/user/fortyHourUpdate/{id}', [UserController::class, 'fortyHourUpdate']);
    Route::put('/user/nameChange/{id}', [UserController::class, 'nameChange']);
    Route::put('/user/passChange/{id}', [UserController::class, 'passChange']);
    Route::put('/user/isAdminUpdate/{id}', [UserController::class, 'isAdminUpdate']);
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy']); 
    // forum
    Route::post('/forum/store', [ForumController::class, 'store']);//->middleware(isAdmin::class);
    Route::delete('/forum/delete/{id}', [ForumController::class, 'destroy']);
    Route::get('/forumType/index', [ForumTypeController::class, 'index']);
    Route::post('/forumType/store', [ForumTypeController::class, 'store']);//->middleware(isAdmin::class);
    Route::delete('/forumType/delete/{id}', [ForumTypeController::class, 'destroy']);
    Route::put('/forum/put/{id}', [ForumController::class, 'update']);
    // review
    
    Route::get('/review/latestDate/{toolId}', [ReviewController::class, 'latestDate']);
    Route::post('/review/store/{toolId}', [ReviewController::class, 'store']);
    Route::put('/review/isHappend/{reviewId}', [ReviewController::class, 'isHappend']);
    Route::put('/review/isSuccesfull/{reviewId}', [ReviewController::class, 'isSuccesfull']);
    Route::get('/review/allDates/{toolId}', [ReviewController::class, 'allDates']);
    Route::put('/review/put/{reviewId}', [ReviewController::class, 'update']);
    Route::delete('/review/delete/{reviewId}', [ReviewController::class, 'destroy']);
});
