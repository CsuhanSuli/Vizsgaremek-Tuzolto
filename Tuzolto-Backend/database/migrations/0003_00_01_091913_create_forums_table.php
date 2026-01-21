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
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("header");
            $table->date("date");
            $table->unsignedBigInteger("typeId");
            $table->foreign("typeId")->references("id")->on("forum_types");
            $table->string("place");
            $table->string("description");
            $table->string("imageName");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forums');
    }
};
