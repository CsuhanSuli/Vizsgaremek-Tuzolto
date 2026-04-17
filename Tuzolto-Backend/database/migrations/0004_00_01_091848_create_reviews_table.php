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
            $table->date('reviewDate');
            $table->boolean('isHappend');
            $table->boolean('isSuccesfull');
            $table->unsignedBigInteger('toolId')->nullable();
            $table->foreign('toolId')->references('id')->on('tools')->onDelete('cascade');
            // be kell valahogy tobb constraintet tenni
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
