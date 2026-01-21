<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class forumType extends Model
{
    public function Forum()
    {
        return $this->hasMany(Forum::class,"typeId");
    }
}
