<?php

namespace App\Http\Controllers;

use App\Actions\Invitation\AcceptInvitation;
use App\Actions\Invitation\InviteUser;
use App\Http\Requests\AcceptInvitationRequest;
use App\Http\Requests\StoreInvitationRequest;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function store(StoreInvitationRequest $request, InviteUser $inviteUser)
    {
        Gate::authorize('create', Invitation::class);

        $inviteUser->handle(
            invitedBy: $request->user(),
            email: $request->validated('email'),
            isStaff: $request->validated('is_staff'),
        );

        return redirect()->route('users.index');
    }

    public function accept(Request $request)
    {
        $invitation = Invitation::where('token', $request->token)->firstOrFail();

        if (! $invitation->isValid()) {
            return redirect()->route('login');
        }

        return Inertia::render('auth/accept-invitation', [
            'invitation' => $invitation,
        ]);

    }

    public function storeAccept($token, AcceptInvitationRequest $request, AcceptInvitation $acceptInvitation)
    {
        $acceptInvitation->handle(
            token: $token,
            data: $request->validated(),
        );

        return redirect()->route('login');
    }

}
