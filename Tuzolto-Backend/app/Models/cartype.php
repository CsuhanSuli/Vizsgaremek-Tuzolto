<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cartype extends Model
{
    public function carToolLink()
    {
        return $this->hasMany(Car::class,"typeId");
    }
}
