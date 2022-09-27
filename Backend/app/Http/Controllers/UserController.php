<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user_db = User::all()->toArray();
        foreach ($user_db as &$user) {
            $user['fullname'] = sprintf("%s %s", $user['name'], $user['surname']);
        }
        return response()->json($user_db);
    }


    /**
     * Display the specified resource.
     *
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $user_db = User::query()->findOrFail($id);
        return response()->json($user_db);
    }

    public function login(int $id)
    {
        $token = Str::random(80);
        $tokenExp = Carbon::now()->addDays(7);
        $user = User::query()->findOrFail($id);
        $user->token = $token;
        $user->tokenExp = $tokenExp;
        $user->save();
        return response()->json(["token" => $token, "tokenExp" => $tokenExp->timestamp]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function checkToken(Request $request)
    {
        $id = $request->input("userId");
        $token = $request->input("token");
        $user = User::findOrFail($id);
        return response()->json($user->token === $token);
    }

    /**
     * @param int $id
     */
    public function logout(int $id)
    {
        $user = User::findOrFail($id);
        $user->token = null;
        $user->tokenExp = null;
        $user->save();
        error_log("Fine");
    }


    public function getIcon(int $id)
    {
        $userInfo = User::findOrFail($id);
        error_log($userInfo->iconName);
        if (empty($userInfo->iconName)) return response()->json(["error" => "Icon not found."], 404);

        $path = resource_path() . "/icon/users/" . $userInfo->iconName;

        if (!File::exists($path)) return response()->json(["error" => "Icon not found."], 404);

        $file = File::get($path);
        $type = File::mimeType($path);

        try {
            $response = response()->make($file, 200);
            $response->header("Content-Type", $type);
            return $response;
        } catch (BindingResolutionException $e) {
            return response()->json(["error" => "Icon not found."], 404);
        }
    }

}
