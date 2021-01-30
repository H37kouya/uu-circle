<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\VerificationEmailCircleUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class VerificationEmailController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $userId
     * @return JsonResponse
     */
    public function __invoke(VerificationEmailCircleUserRequest $request, int $userId): JsonResponse
    {
        // 有効な署名かどうか
        if (! URL::hasValidSignature($request)) {
            return response()->json([
                'status' => __('verification.invalid'),
            ], 400);
        }

        $user = User::findOrFail($userId);
        // CircleUserであるかどうか
        if (!$user->isCircleUser()) {
            return response()->json([
                'status' => '有効なURLではありません。再登録し直して下さい。',
            ]);
        }

        // すでに認証されているかどうか
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'status' => __('verification.already_verified'),
            ], 400);
        }

        $user->markEmailAsVerified($request->get('password'));

        return response()->json([
            'status' => true
        ]);
    }
}