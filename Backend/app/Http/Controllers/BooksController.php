<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Carbon\Carbon;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class BooksController extends Controller
{
    public function userBooks(int $id)
    {
        $userBooks = Books::select("books.*")
            ->join("users", "books.userId", "=", "users.id")
            ->where("users.id", "=", $id)
            ->get()->toArray();
        error_log(print_r($userBooks, true));
        foreach ($userBooks as &$book) {
            $book['dataAggiunta'] = Carbon::createFromFormat("Y-m-d", $book['dataAggiunta'])->format("d/m/Y");
            $book['dataRimozione'] = (Carbon::canBeCreatedFromFormat("Y-m-d", $book['dataRimozione'])) ?
                Carbon::createFromFormat("Y-m-d", $book['dataRimozione'])->format("d/m/Y") : null;
        }
        return response()->json($userBooks);
    }

    public function getBookInfo(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        $bookInfo['dataAggiunta'] = Carbon::createFromFormat("Y-m-d", $bookInfo['dataAggiunta'])->format("d/m/Y");
        $bookInfo['dataRimozione'] = (Carbon::canBeCreatedFromFormat("Y-m-d", $bookInfo['dataRimozione'])) ?
            Carbon::createFromFormat("Y-m-d", $bookInfo['dataRimozione'])->format("d/m/Y") : null;

        return response()->json($bookInfo);
    }

    public function getIcon(int $id){
        $bookInfo = Books::findOrFail($id);
        if(empty($bookInfo->iconName)) return response()->json(["error"=>"Icon not found."],404);

        $path = resource_path()."/icon/books/".$bookInfo->iconName;

        if(!File::exists($path)) return response()->json(["error"=>"Icon not found."],404);

        $file = File::get($path);
        $type = File::mimeType($path);

        try {
            $response = response()->make($file, 200);
            $response->header("Content-Type", $type);
            return $response;
        } catch (BindingResolutionException $e) {
            return response()->json(["error"=>"Icon not found."],404);
        }
    }
}
