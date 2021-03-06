<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\CircleUser;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowCircleUserController extends Controller
{
    use Permission;

    /**
     * @param Request $request
     * @param int     $circleId
     * @param int     $userId
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     *
     * @return array
     */
    public function __invoke(Request $request, int $circleId, int $userId)
    {
        Log::debug('ShowCircleUserController args', [
            'circleId' => $circleId,
            'userId'   => $userId,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->select([
                UserProperty::display_name,
                UserProperty::email,
                UserProperty::email_verified_at,
                UserProperty::id,
                UserProperty::username,
            ])
            ->findOrFail($userId);
        $this->permissionCircle($user, $circleId);

        $circleUser = CircleUser::whereUserId($userId)
            ->whereCircleId($circleId)
            ->firstOrFail('role');

        return [
            'data' => Arr::camel_keys(array_merge(
                $user->toArray(),
                ['role' => $circleUser->role]
            )),
        ];
    }
}
