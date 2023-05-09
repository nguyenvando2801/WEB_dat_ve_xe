<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Book extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_new');
            $table->integer('id_user');
            $table->integer('count');
            $table->integer('status')->default(0);
            $table->integer('id_nhaxe');
            $table->text('name');
            $table->text('id_location');
            $table->text('phone');
            $table->text('email');
            $table->text('content');
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
        //
    }
}
