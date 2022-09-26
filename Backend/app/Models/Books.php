<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{

    public $primaryKey = "id";
    public $timestamps = true;
    protected $table = "books";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'dataAggiunta',
        'numeroLetture',
        "trama",
        "dataRimozione",
        "iconPath",
        "userId"
    ];


}
