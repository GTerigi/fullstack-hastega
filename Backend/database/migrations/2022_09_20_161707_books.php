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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('author', 255);
            $table->string('isbn', 13)->default("0000000000000");
            $table->date("dataAggiunta")->nullable(false);
            $table->date("dataRimozione")->nullable()->default(null);
            $table->text("trama")->default(null);
            $table->integer("numeroLetture")->default(1);
            $table->string('iconPath', 255); // Nome del File che funge da copertina del libro
            $table->foreignIdFor(User::class, "userId");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('books');
    }
};
