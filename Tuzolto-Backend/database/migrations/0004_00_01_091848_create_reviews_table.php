<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date("reviewDate");
            $table->boolean("isHappend");
            $table->boolean("isSuccesfull");
            $table->unsignedBigInteger("reviewTypeId");
            $table->foreign("reviewTypeId")->references("id")->on("review_types");
            $table->string("whatIsIt");
            $table->unsignedBigInteger("objectId");
            $table->foreign("objectId")->references("id")->on("cars");
            //be kell valahogy tobb constraintet tenni
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
