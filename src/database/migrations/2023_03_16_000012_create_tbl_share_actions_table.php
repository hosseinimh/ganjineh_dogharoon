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
            $table->string('transaction_date')->default(null);
            $table->string('invoice_no')->default(null);
            $table->unsignedBigInteger('bank_id')->default(null);
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
