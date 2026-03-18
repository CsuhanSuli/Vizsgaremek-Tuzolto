<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class review extends Model
{
    public function tools()
    {
        return $this->belongsTo(tools::class, 'toolId');
    }
}
