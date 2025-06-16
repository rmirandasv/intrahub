<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    protected $fillable = [
        'post_id',
        'event_date',
        'location',
        'capacity',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'datetime',
            'capacity' => 'integer',
        ];
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(EventRsvp::class);
    }
}
