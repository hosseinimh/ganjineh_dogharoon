<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_share_actions', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('action_type');
            $table->string('action_date');
            $table->bigInteger('count');
            $table->unsignedBigInteger('member_id');
            $table->text('description');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('member_id')->references('id')->on('tbl_members');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_share_actions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
