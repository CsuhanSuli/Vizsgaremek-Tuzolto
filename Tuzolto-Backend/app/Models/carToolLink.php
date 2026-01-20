<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class carToolLink extends Model
{
    public function Car()
    {
        return $this->belongsTo(Car::class,"carId");
    }
    public function carPlace()
    {
        return $this->belongsTo(carPlace::class,"placeId");
    }
    public function tools()
    {
        return $this->belongsTo(tools::class,"toolId");
    }
}
