<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'post_type',
        'user_id',
        'published_at',
        'expiration_date',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'expiration_date' => 'datetime',
            'is_featured' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function benefit(): HasOne
    {
        return $this->hasOne(Benefit::class);
    }

    public function event(): HasOne
    {
        return $this->hasOne(Event::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_post');
    }
}
