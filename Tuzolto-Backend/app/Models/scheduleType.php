<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class scheduleType extends Model
{
    public function schedules()
    {
        return $this->hasMany(schedule::class,"scheduleTypeid");
    }
}
