<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertises', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->comment('広告タイトル');
            $table->string('main_image_url')->nullable()->comment('画像URL');
            $table->boolean('active')->default(false)->comment('公開するかどうか');
            $table->dateTime('publish_to')->nullable()->comment('公開開始日時');
            $table->dateTime('publish_from')->nullable()->comment('公開開始日時');
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
        Schema::dropIfExists('advertise');
    }
}