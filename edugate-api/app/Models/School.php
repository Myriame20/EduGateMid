<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    protected $fillable = [
        'name',
        'city',
        'type',
        'address',
        'email',
        'phone',
        'is_active',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}