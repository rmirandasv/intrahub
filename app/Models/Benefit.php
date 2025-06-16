<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Benefit extends Model
{
    protected $fillable = [
        'post_id',
        'partner_name',
        'website',
        'email',
        'phone',
        'address',
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
