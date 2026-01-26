<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tools extends Model
{
    public function toolType()
    {
        return $this->belongsTo(toolType::class,"toolTypeId");
    }
    public function Car()
    {
        return $this->belongsTo(Car::class,"carId");
    }
    public function carPlace()
    {
        return $this->belongsTo(carPlace::class,"placeId");
    }
}
