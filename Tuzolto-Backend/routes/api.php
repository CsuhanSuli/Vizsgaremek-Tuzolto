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
    Route::post('/examUser/store', [ExamUserController::class, 'store'])->middleware(isAdmin::class);
    Route::put('/examUser/put/{id}', [ExamUserController::class, 'update'])->middleware(isAdmin::class);
    Route::get('/exams/index', [ExamsController::class, 'index']);
    Route::post('/exams/store', [ExamsController::class, 'store'])->middleware(isAdmin::class);
    Route::delete('/examUser/delete/{id}', [ExamUserController::class, 'destroy'])->middleware(isAdmin::class);
    // examType
    Route::get('/examType/index', [ExamTypeController::class, 'index']);
    Route::delete('/examType/delete/{id}', [ExamTypeController::class, 'destroy'])->middleware(isAdmin::class);
    Route::post('/examType/store', [ExamTypeController::class, 'store'])->middleware(isAdmin::class);

    // tools
    Route::post('/tools/store', [ToolsController::class, 'store'])->middleware(isAdmin::class);
    Route::get('/tools/show/{id}', [ToolsController::class, 'show']);
    Route::put('/tools/put/{id}', [ToolsController::class, 'update'])->middleware(isAdmin::class);
    Route::delete('/tools/delete/{id}', [ToolsController::class, 'destroy'])->middleware(isAdmin::class);

    // cars
    Route::post('/car/store', [CarController::class, 'store'])->middleware(isAdmin::class);
    Route::delete('/car/delete/{id}', [CarController::class, 'destroy'])->middleware(isAdmin::class);
    Route::put('/car/put/{id}', [CarController::class, 'update'])->middleware(isAdmin::class);
    // cartype
    Route::get('/cartype/index', [CartypeController::class, 'index']);
    Route::delete('/cartype/delete', [CartypeController::class, 'destroy'])->middleware(isAdmin::class);
    // carplace
    Route::get('/carplace/index', [CarPlaceController::class, 'index']);
    // schedules
    Route::get('/schedule/index', [ScheduleController::class, 'index']);
    Route::post('/schedule/store', [ScheduleController::class, 'store'])->middleware(isAdmin::class);
    Route::put('/schedule/put/{id}', [ScheduleController::class, 'update'])->middleware(isAdmin::class);
    Route::delete('/schedule/delete/{id}', [ScheduleController::class, 'destroy'])->middleware(isAdmin::class);
    // schedule_types
    Route::get('/schedule_types', [ScheduleTypeController::class, 'index']);
    // user
    Route::put('/user/fortyHourUpdate/{id}', [UserController::class, 'fortyHourUpdate'])->middleware(isAdmin::class);
    Route::put('/user/nameChange/{id}', [UserController::class, 'nameChange'])->middleware(isAdmin::class);
    Route::put('/user/passChange/{id}', [UserController::class, 'passChange'])->middleware(isAdmin::class);
    Route::put('/user/isAdminUpdate/{id}', [UserController::class, 'isAdminUpdate'])->middleware(isAdmin::class);
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->middleware(isAdmin::class);
    // forum
    Route::post('/forum/store', [ForumController::class, 'store'])->middleware(isAdmin::class);
    Route::delete('/forum/delete/{id}', [ForumController::class, 'destroy'])->middleware(isAdmin::class);
    Route::get('/forumType/index', [ForumTypeController::class, 'index']);
    Route::post('/forumType/store', [ForumTypeController::class, 'store'])->middleware(isAdmin::class);
    Route::delete('/forumType/delete/{id}', [ForumTypeController::class, 'destroy'])->middleware(isAdmin::class);
    Route::put('/forum/put/{id}', [ForumController::class, 'update'])->middleware(isAdmin::class);
    // review

    Route::get('/review/latestDate/{toolId}', [ReviewController::class, 'latestDate']);
    Route::post('/review/store/{toolId}', [ReviewController::class, 'store'])->middleware(isAdmin::class);
    Route::put('/review/isHappend/{reviewId}', [ReviewController::class, 'isHappend'])->middleware(isAdmin::class);
    Route::put('/review/isSuccesfull/{reviewId}', [ReviewController::class, 'isSuccesfull'])->middleware(isAdmin::class);
    Route::get('/review/allDates/{toolId}', [ReviewController::class, 'allDates']);
    Route::put('/review/put/{reviewId}', [ReviewController::class, 'update'])->middleware(isAdmin::class);
    Route::delete('/review/delete/{reviewId}', [ReviewController::class, 'destroy'])->middleware(isAdmin::class);
});
