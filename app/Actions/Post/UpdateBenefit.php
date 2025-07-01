<?php

namespace App\Actions\Post;

use App\Models\Benefit;
use App\Models\Post;

class UpdateBenefit
{
    /**
     * Update an existing benefit for the given post.
     *
     * @param  array  $data{
     *                        title: string,
     *                        content: string,
     *                        expiration_date: string,
     *                        is_featured: boolean,
     *                        category_id: string | null,
     *                        images: array | null,
     *                        partner_name: string,
     *                        website: string | null,
     *                        email: string | null,
     *                        phone: string | null,
     *                        address: string | null,
     *                        }
     */
    public function handle(Benefit $benefit, array $data): void
    {
        $benefit->post->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'expiration_date' => $data['expiration_date'] ?? null,
            'is_featured' => $data['is_featured'] ?? false,
            'category_id' => $data['category_id'] ?? null,
        ]);

        $benefit->update([
            'partner_name' => $data['partner_name'],
            'website' => $data['website'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
        ]);

        if (isset($data['images'])) {
            $benefit->post->clearMediaCollection('benefits');

            if (is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $benefit->post->addMedia($image)->toMediaCollection('benefits');
                }
            } else {
                $benefit->post->addMedia($data['images'])->toMediaCollection('benefits');
            }
        }
    }
}
