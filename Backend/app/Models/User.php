<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @method static findOrFail(int $id)
 */
class User extends Authenticatable
{
    public $primaryKey = "id";
    protected $table = "users";
    /**
     * The attributes that are mass assignable.
     *
     * @var []<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'iconName'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var []<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var []<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
