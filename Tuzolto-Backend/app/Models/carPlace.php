<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class carPlace extends Model
{
    public function carToolLink()
    {
        return $this->hasMany(carToolLink::class,"placeId");
    }
}
