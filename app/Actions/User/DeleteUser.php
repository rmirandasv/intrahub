<?php

namespace App\Actions\User;

use App\Models\User;

class DeleteUser
{
    /**
     * Delete a user
     * 
     * @param User $user
     * @return void
     */
    public function handle(User $user): void
    {
        $user->delete();
    }
}