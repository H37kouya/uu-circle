<?php

namespace App\Listeners;

use App\Events\RegisteredAdminUser;
use Illuminate\Auth\Events\PasswordResetCircleUser;

class SendPasswordResetCircleUserNotification
{
    /**
     * Handle the event.
     *
     * @param RegisteredAdminUser $event
     * @return void
     */
    public function handle(PasswordResetCircleUser $event)
    {
        if (!$event->user->hasVerifiedEmail()) {
            $event->user->sendEmailVerificationAdminUserNotification();
        }
    }
}