<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCircleTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_tags', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('circle_id');
            $table->boolean('sport')->default(false)->comment('運動系');
            $table->boolean('music')->default(false)->comment('音楽系');
            $table->boolean('culture')->default(false)->comment('文化系');
            $table->boolean('nature')->default(false)->comment('農業・自然');
            $table->boolean('volunteer')->default(false)->comment('ボランティア');
            $table->boolean('international')->default(false)->comment('国際交流');
            $table->boolean('incare')->default(false)->comment('インカレ');
            $table->boolean('loose')->default(false)->comment('ゆるい');
            $table->boolean('community')->default(false)->comment('地域おこし');
            $table->boolean('programming')->default(false)->comment('プログラミング');
            $table->boolean('urgent_recruitment')->default(false)->comment('部員急募');
            $table->boolean('mystery')->default(false)->comment('謎');
            $table->timestamps();

            $table->foreign('circle_id')->references('id')->on('circles');
        });

        DB::statement("ALTER TABLE circle_tags COMMENT 'サークルタグ'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_tags');
    }
}
