<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enum\UserModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\VerificationResendAdminUserFormRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class VerificationResendController extends Controller
{
    /**
     * 認証用のメールを再通知
     *
     * @param VerificationResendAdminUserFormRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function __invoke(VerificationResendAdminUserFormRequest $request): JsonResponse
    {
        $email = $request->get(UserModel::email);

        try {
            $user = User::whereEmail($email)->firstOrFail();
        } catch (Exception $e) {
            throw ValidationException::withMessages([
                'email' => [__('verification.user')],
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            throw ValidationException::withMessages([
                'email' => [__('verification.already_verified')],
            ]);
        }

        // 認証用のメールを通知
        $user->sendEmailVerificationAdminUserNotification();

        return response()->json(['status' => __('verification.sent')]);
    }
}