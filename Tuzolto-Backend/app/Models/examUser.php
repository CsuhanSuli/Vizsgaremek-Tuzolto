<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examUser extends Model
{
    public function exams()
    {
        return $this->belongsTo(exams::class,"examId");
    }
    public function users()
    {
        return $this->belongsTo(User::class,"examId");
    }
}
