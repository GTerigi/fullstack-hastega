<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('surname', 255);
            $table->string('email', 255)->unique();
            $table->char('password', 64); // In sha256
            $table->string("token", 80)->unique()->nullable()->default(null);
            $table->timestamp("tokenExp")->nullable()->default(null);
            $table->string('iconName', 255)->nullable()->default(null); // Nome del File che funge da icona del profilo
            $table->timestamps();
        });

        $userInfo = json_decode(file_get_contents(__DIR__ . "/user.json"), true);
        foreach ($userInfo as $user) (new User($user))->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
