<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCircleNewJoysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_new_joys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('circle_id');
            $table->string('title')->comment('新歓名');
            $table->string('description')->nullable()->comment('新歓紹介');
            $table->string('url')->nullable()->comment('新歓URL');
            $table->string('place_of_activity')->nullable()->comment('活動場所');
            $table->string('place_of_activity_detail')->nullable()->comment('活動場所詳細');
            $table->dateTime('publish_from')->nullable()->comment('予約投稿日時');
            $table->dateTime('start_date')->nullable()->comment('新歓開始日時');
            $table->dateTime('end_date')->nullable()->comment('新歓終了日時');
            $table->boolean('release')->default(true)->comment('公開設定');
            $table->timestamps();

            $table->foreign('circle_id')->references('id')->on('circles');
            $table->index([
                'release',
                'publish_from',
            ]);
        });

        DB::statement("ALTER TABLE circle_new_joys COMMENT 'サークル新歓'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_new_joys');
    }
}
