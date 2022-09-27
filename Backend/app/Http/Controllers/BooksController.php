<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Carbon\Carbon;
use Illuminate\Contracts\Container\BindingResolutionException;
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
//            $book['dataRimozione'] = (Carbon::canBeCreatedFromFormat("Y-m-d", $book['dataRimozione'])) ?
//                Carbon::createFromFormat("Y-m-d", $book['dataRimozione'])->format("d/m/Y") : null;
            if ($book['dataRimozione']) $book['dataRimozione'] = Carbon::createFromFormat("Y-m-d", $book['dataRimozione'])->format("d/m/Y");

        }
        return response()->json($userBooks);
    }

    public function getBookInfo(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        $bookInfo['dataAggiunta'] = Carbon::createFromFormat("Y-m-d", $bookInfo['dataAggiunta'])->format("d/m/Y");
        if (Carbon::canBeCreatedFromFormat("Y-m-d", $bookInfo['dataRimozione'])) error_log("PDDD");
        if ($bookInfo['dataRimozione']) $bookInfo['dataRimozione'] = Carbon::createFromFormat("Y-m-d", $bookInfo['dataRimozione'])->format("d/m/Y");
        error_log($bookInfo['dataRimozione']);
        return response()->json($bookInfo);
    }

    public function getIcon(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        if (empty($bookInfo->iconName)) return response()->json(["error" => "Icon not found."], 404);

        $path = resource_path() . "/icon/books/" . $bookInfo->iconName;

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

    public function increaseCounter(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        $bookInfo->numeroLetture++;
        try {
            $bookInfo->saveOrFail();
            return response()->json();
        } catch (\Throwable $e) {
            // Not modified
            return response("", 304)->json();
        }
    }

    public function remove(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        $bookInfo->dataRimozione = Carbon::now()->format("Y-m-d");
        try {
            $bookInfo->saveOrFail();
            return response()->json();
        } catch (\Throwable $e) {
            // Not modified
            return response("", 304)->json();
        }
    }

    public function restore(int $id)
    {
        $bookInfo = Books::findOrFail($id);
        $bookInfo->dataRimozione = null;
        try {
            $bookInfo->saveOrFail();
            return response()->json();
        } catch (\Throwable $e) {
            // Not modified
            return response("", 304)->json();
        }
    }
}
