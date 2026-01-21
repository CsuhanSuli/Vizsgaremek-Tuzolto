<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cartype extends Model
{
    public function Car()
    {
        return $this->hasMany(Car::class,"typeId");
    }
}
