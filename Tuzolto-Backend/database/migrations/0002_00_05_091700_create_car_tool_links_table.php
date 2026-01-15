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
        Schema::create('car_tool_links', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger("placeId");
            $table->unsignedBigInteger("carId");
            $table->unsignedBigInteger("toolId");
            $table->foreign("placeId")->references("id")->on("car_places");
            $table->foreign("carId")->references("id")->on("cars");
            $table->foreign("toolId")->references("id")->on("tools");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_tool_links');
    }
};
