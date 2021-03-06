<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Models\Circle;
use App\Models\CircleUser;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

final class CreateCircleUserRelationController
{
    /**
     * UserとCircleを紐づける.
     *
     * @param Request $request
     * @param int     $userId
     * @param int     $circleId
     *
     * @throws ValidationException
     * @throws \Exception
     */
    public function __invoke(Request $request, int $userId, int $circleId)
    {
        Log::debug('CreateCircleUserRelationController args', [
            'userId'   => $userId,
            'circleId' => $circleId,
        ]);

        if (!Circle::exists($circleId)) {
            Log::warning('[WARNING] CreateCircleUserRelationController 指定されたサークルが存在しません。', [
                'userId'   => $userId,
                'circleId' => $circleId,
            ]);

            throw ValidationException::withMessages([
                'data' => '指定されたサークルが存在しません。',
            ]);
        }

        if (!User::exists($circleId)) {
            Log::warning('[WARNING] CreateCircleUserRelationController 指定されたユーザーが存在しません。', [
                'userId'   => $userId,
                'circleId' => $circleId,
            ]);

            throw ValidationException::withMessages([
                'data' => '指定されたユーザーが存在しません。',
            ]);
        }

        if (CircleUser::whereUserId($userId)->whereCircleId($circleId)->exists()) {
            throw ValidationException::withMessages([
                'data' => 'すでに連携済みです。',
            ]);
        }

        DB::beginTransaction();

        try {
            (new CircleUser())->fill([
                'circle_id' => $circleId,
                'user_id'   => $userId,
            ])->save();

            DB::commit();
        } catch (Exception $e) {
            Log::warning('[ERROR] CreateCircleUserRelationController', [
                'userId'   => $userId,
                'circleId' => $circleId,
            ]);

            DB::rollBack();

            throw $e;
        }
    }
}
