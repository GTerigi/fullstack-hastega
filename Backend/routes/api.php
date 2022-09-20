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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
//Route::get('/hello', function () {
//    return 'Hello World';
//});
//
//Route::get('/posts/{post}/comments/{comment}', function ($postId, $commentId) {
//    error_log(sprintf("postID: %s", $postId));
//    error_log(sprintf("commentId: %s", $commentId));
//});
//// Optional Parameters
//Route::get('/user/{name?}', function ($name = null) {
//    return json_encode(["ciao" => $name], JSON_THROW_ON_ERROR);
//});

Route::resource('users', UserController::class);
