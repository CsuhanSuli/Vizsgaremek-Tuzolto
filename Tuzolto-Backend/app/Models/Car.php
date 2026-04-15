<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public function tools()
    {
        return $this->hasMany(tools::class, 'typeId');
    }

    public function review()
    {
        return $this->hasMany(review::class, 'objectId');
    }

    public function cartypes()
    {
        return $this->belongsTo(cartype::class, 'typeId', 'id');
    }
}
