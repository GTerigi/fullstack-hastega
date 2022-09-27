<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static findOrFail(int $id)
 */
class Books extends Model
{

    public $primaryKey = "id";
    protected $table = "books";
    /**
     * The attributes that are mass assignable.
     *
     * @var []<int, string>
     */
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'dataAggiunta',
        'numeroLetture',
        "trama",
        "dataRimozione",
        "iconName",
        "userId"
    ];


}
