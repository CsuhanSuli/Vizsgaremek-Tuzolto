<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class toolType extends Model
{
    public function tools()
    {
        return $this->hasMany(tools::class,"toolTypeId");
    }
}
