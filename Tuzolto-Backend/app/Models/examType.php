<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examType extends Model
{
    public function exams()
    {
        return $this->hasMany(exams::class,"examtype");
    }
}
