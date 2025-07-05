<?php

namespace App\Actions\Invitation;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AcceptInvitation
{
    public function handle(string $token, array $data)
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();

        $user = User::create([
            'name' => $data['name'],
            'email' => $invitation->email,
            'password' => Hash::make($data['password']),
            'is_staff' => $invitation->is_staff,
        ]);

        $invitation->accepted_at = now();
        $invitation->save();

        return $user;
    }
}
