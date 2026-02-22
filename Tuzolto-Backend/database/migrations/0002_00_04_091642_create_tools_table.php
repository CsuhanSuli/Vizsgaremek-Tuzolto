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
        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->unsignedBigInteger("toolTypeId");
            $table->foreign("toolTypeId")->references("id")->on("tool_types");
            $table->unsignedBigInteger("placeId");
            $table->foreign("placeId")->references("id")->on("car_places");
            $table->unsignedBigInteger("carId");
            $table->foreign("carId")->references("id")->on("cars");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tools');
    }
};
