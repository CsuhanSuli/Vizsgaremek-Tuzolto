<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public function carToolLink()
    {
        return $this->hasMany(carToolLink::class,"carId");
    }
    public function review()
    {
        return $this->hasMany(review::class,"objectId");
    }
    public function cartype()
    {
        return $this->belongsTo(cartype::class,"typeId");
    }
}
