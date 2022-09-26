<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Carbon\Carbon;

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
}
