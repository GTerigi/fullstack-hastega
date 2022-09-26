<?php

use App\Http\Controllers\BooksController;
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
Route::get("users/{id}/show", [UserController::class, "show"]);
Route::get("users/{id}/login", [UserController::class, "login"]);
Route::post("users/checkToken", [UserController::class, "checkToken"]);
Route::delete("users/{id}/logout", [UserController::class, "logout"]);

Route::get("books/users/{id}", [BooksController::class, "userBooks"])->middleware("checkToken");
Route::get("books/{id}", [BooksController::class, "getBookInfo"])->middleware("checkToken");


Route::get("unauthorized", ["as" => "unauthorized", "uses" => function () {
    http_response_code(401);
    response()->json("");
}]);

