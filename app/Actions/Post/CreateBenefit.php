<?php

namespace App\Actions\Post;

use App\Enums\PostType;
use App\Models\Benefit;
use App\Models\Post;
use App\Models\User;

class CreateBenefit
{
    /**
     * Create a new benefit for the given post.
     *
     * @param  array  $data{
     *  title: string,
     *  content: string,
     *  expiration_date: string,
     *  is_featured: boolean,
     *  category_id: string | null,
     *  images: array | null,
     *  partner_name: string,
     *  website: string | null,
     *  email: string | null,
     *  phone: string | null,
     *  address: string | null,
     * }
     */
    public function handle(User $user, array $data): Benefit
    {
        $post = Post::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'post_type' => PostType::BENEFIT,
            'user_id' => $user->id,
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'category_id' => $data['category_id'] ?? null,
        ]);

        $benefit = Benefit::create([
            'post_id' => $post->id,
            'partner_name' => $data['partner_name'],
            'website' => $data['website'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
        ]);

        if ($data['images']) {
            if (is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $post->addMedia($image)->toMediaCollection('benefits');
                }
            } else {
                $post->addMedia($data['images'])->toMediaCollection('benefits');
            }
        }

        return $benefit;
    }
}
