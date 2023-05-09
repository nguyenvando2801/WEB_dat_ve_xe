<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Post extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->increments('id');
            $table->text('name');
            $table->text('text');
            $table->dateTime('timestart');
            $table->dateTime('timeend');
            $table->text('addressstart');
            $table->text('addressend');
            $table->string('price');
            $table->integer('ghe1');
            $table->integer('ghe2');
            $table->integer('ghe3');
            $table->integer('ghe4');
            $table->integer('ghe5');
            $table->integer('ghe6');
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
