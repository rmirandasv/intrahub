<?php

namespace App\Actions\Invitation;

use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class InviteUser
{
    public function handle(User $invitedBy, string $email, bool $isStaff = false): Invitation
    {
        $invitation = Invitation::create([
            'email' => $email,
            'token' => Invitation::generateToken(),
            'is_staff' => $isStaff,
            'invited_by' => $invitedBy->id,
            'expires_at' => now()->addDays(2),
        ]);

        Mail::to($email)->queue(new InvitationMail($invitation));

        return $invitation;
    }
}
