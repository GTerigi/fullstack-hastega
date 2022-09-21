<?php

namespace App\Http\Controllers;

use \Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Errore dell'Ide, sembra deprecato.
        // return response()->json(User::all());

        // DB Facade facade è documentato. https://laravel.com/docs/9.x/queries
        $user_db = DB::table('users')->select()->get();
        return response()->json($user_db);
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Errore dell'Ide, sembra deprecato.
        // return response()->json(User::find($id));

        // DB Facade facade è documentato. https://laravel.com/docs/9.x/queries
        $user_db = DB::table('users')->where("id", "=", $id)
            ->select()->get();
        return response()->json($user_db);
    }

}
