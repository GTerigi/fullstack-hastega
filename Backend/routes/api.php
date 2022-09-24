<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("users", [UserController::class, "index"]);
Route::get("users/show/{id}", [UserController::class, "show"]);
Route::get("users/login/{id}", [UserController::class, "login"]);
Route::post("users/checkToken", [UserController::class, "checkToken"]);
Route::delete("users/logout/{id}", [UserController::class, "logout"]);

