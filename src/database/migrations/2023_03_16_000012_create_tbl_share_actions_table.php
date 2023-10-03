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
            $table->string('action_date');
            $table->unsignedTinyInteger('action_type');
            $table->string('transaction_date')->nullable();
            $table->unsignedBigInteger('bank_id')->nullable();
            $table->string('invoice_no', 50)->nullable();
            $table->unsignedBigInteger('price');
            $table->unsignedBigInteger('owner_id');
            $table->unsignedTinyInteger('is_member');
            $table->text('description');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('bank_id')->references('id')->on('tbl_banks');
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
