<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Ticket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tiker', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_nhaxe');
            $table->integer('location');
            $table->integer('id_user')->default(0);
            $table->integer('status');
            $table->integer('id_news');
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
