<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class exams extends Model
{
    public function examType()
    {
        return $this->hasMany(examType::class,"examtype");
    }
}
