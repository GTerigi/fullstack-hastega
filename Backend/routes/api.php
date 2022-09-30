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

Route::get("users", [UserController::class, "index"])->middleware("cors");
Route::get("users/{id}/show", [UserController::class, "show"])->middleware("cors");;
Route::get("users/{id}/login", [UserController::class, "login"])->middleware("cors");;
Route::post("users/checkToken", [UserController::class, "checkToken"])->middleware("cors");;
Route::delete("users/{id}/logout", [UserController::class, "logout"])->middleware("cors");;
Route::post("users/{id}/icon", [UserController::class, "getIcon"])->middleware("cors");;

Route::get("books/users/{id}", [BooksController::class, "userBooks"])->middleware(["checkToken", "cors"]);
Route::get("books/{id}", [BooksController::class, "getBookInfo"])->middleware(["checkToken", "cors"]);
Route::post("books/{id}/icon", [BooksController::class, "getIcon"])->middleware(["checkToken", "cors"]);
Route::put("books/{id}/counter", [BooksController::class, "increaseCounter"])->middleware(["checkToken", "cors"]);
Route::put("books/{id}/delete", [BooksController::class, "remove"])->middleware(["checkToken", "cors"]);
Route::put("books/{id}/restore", [BooksController::class, "restore"])->middleware(["checkToken", "cors"]);

Route::get("unauthorized", ["as" => "unauthorized", "uses" => function () {
    http_response_code(401);
    response()->json("");
}]);

