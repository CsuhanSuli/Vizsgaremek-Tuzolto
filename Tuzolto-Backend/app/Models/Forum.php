<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    public function forumType()
    {
        return $this->belongsTo(forumType::class,"typeId");
    }
}
