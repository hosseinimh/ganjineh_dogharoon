<?php

namespace App\Packages;

use App\Facades\Helper;
use App\Mail\SendUserEmailTokenMail;
use App\Mail\SendUserForgotPasswordMail;
use App\Mail\SendUserSignupMail;
use App\Services\SentEmailService;
use Exception;
use Illuminate\Support\Facades\Mail;

class AppMailer
{
    public function sendUserSignupMail(string $email, string $username, string $password): void
    {
        try {
            $messageFields = implode("|", [$username, $password]);
            $service = new SentEmailService();
            $service->store('no-reply@toptradersfunding.com', $email, 'SendUserSignupMail', $messageFields);
            Mail::to($email)->send(new SendUserSignupMail($username, $password));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }

    public function sendUserForgotPasswordMail(string $email, string $username, string $password): void
    {
        try {
            $messageFields = implode("|", [$username, $password]);
            $service = new SentEmailService();
            $service->store('no-reply@toptradersfunding.com', $email, 'SendUserForgotPasswordMail', $messageFields);
            Mail::to($email)->send(new SendUserForgotPasswordMail($username, $password));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }

    public function sendUserEmailTokenMail(string $email, string $token): void
    {
        try {
            $messageFields = implode("|", [$email, $token]);
            $service = new SentEmailService();
            $service->store('no-reply@toptradersfunding.com', $email, 'SendUserEmailTokenMail', $messageFields);
            Mail::to($email)->send(new SendUserEmailTokenMail($token));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }
}
