<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\error;
use function Laravel\Prompts\password;
use function Laravel\Prompts\text;

class CreateStaffUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'intrahub:create-staff-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new staff user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = text(
            label: 'Name',
            placeholder: 'Enter the name of the staff user',
            required: true,
        );

        $email = text(
            label: 'Email',
            placeholder: 'Enter the email of the staff user',
            required: true,
        );

        $password = password(
            label: 'Password',
            placeholder: 'Enter the password of the staff user',
            required: true,
        );

        $confirmPassword = password(
            label: 'Confirm Password',
            placeholder: 'Confirm the password of the staff user',
            required: true,
        );

        if ($password !== $confirmPassword) {
            error('Passwords do not match');

            return self::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_staff' => true,
            'email_verified_at' => now(),
        ]);

        $this->info('Staff user created successfully');

        return self::SUCCESS;
    }
}
