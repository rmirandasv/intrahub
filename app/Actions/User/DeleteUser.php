<?php

namespace App\Actions\User;

use App\Models\User;

class DeleteUser
{
    /**
     * Delete a user
     */
    public function handle(User $user): void
    {
        $user->delete();
    }
}
