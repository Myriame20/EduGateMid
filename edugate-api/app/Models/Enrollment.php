<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    protected $fillable = [
        'school_id',
        'parent_name',
        'parent_email',
        'parent_phone',
        'child_first_name',
        'child_last_name',
        'child_birth_date',
        'requested_level',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'child_birth_date' => 'date',
        ];
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}