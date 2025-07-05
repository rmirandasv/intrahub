<x-mail::message>
# You have been invited to join {{ config('app.name') }}

You have been invited by {{ $invitation->invitedBy->name }} to join {{ config('app.name') }}.

Click the button below to accept the invitation.

<x-mail::button :url="$url">
Accept Invitation
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
