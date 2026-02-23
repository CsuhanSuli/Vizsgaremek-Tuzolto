<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class schedule extends Model
{
    public function schedule_types()
    {

        return $this->belongsTo(scheduleType::class,"scheduleTypeid");
    }
    public function users()
    {
        return $this->belongsTo(User::class,"userId");
    }
}
