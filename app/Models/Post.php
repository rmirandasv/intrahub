<?php

namespace App\Models;

use App\Enums\PostType;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'post_type',
        'user_id',
        'published_at',
        'expiration_date',
        'is_featured',
        'category_id',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'expiration_date' => 'datetime',
            'is_featured' => 'boolean',
            'post_type' => PostType::class,
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

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    #[Scope]
    public function announcements(Builder $query): Builder
    {
        return $query->where('post_type', PostType::ANNOUNCEMENT);
    }

    #[Scope]
    public function benefits(Builder $query): Builder
    {
        return $query->where('post_type', PostType::BENEFIT);
    }

    #[Scope]
    public function events(Builder $query): Builder
    {
        return $query->where('post_type', PostType::EVENT);
    }
}
