<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class carPlace extends Model
{
    public function tools()
    {
        return $this->hasMany(tools::class,"placeId");
    }
}
