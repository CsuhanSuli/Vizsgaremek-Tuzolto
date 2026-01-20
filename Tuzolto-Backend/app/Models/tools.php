<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tools extends Model
{
    public function carToolLink()
    {
        return $this->hasMany(carToolLink::class,"toolId");
    }
        public function toolType()
    {
        return $this->belongsTo(toolType::class,"toolTypeId");
    }
}
