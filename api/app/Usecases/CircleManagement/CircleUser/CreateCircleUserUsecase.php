<?php

namespace App\Usecases\CircleManagement\CircleUser;

use App\Events\RegisteredCircleUser;
use App\Models\Circle;
use App\Models\User;
use App\Usecases\CircleManagement\CircleUser\Params\CreateCircleUserUsecaseParam;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateCircleUserUsecase
{
    /**
     * invoke
     *
     * @param int $circleId
     * @param CircleUserValueObject $circleValueObject
     * @return void
     * @throws Exception
     */
    public function invoke(
        CreateCircleUserUsecaseParam $param
    ) {
        Log::debug("CreateCircleUserUsecase args", [
            'CreateCircleUserUsecaseParam' => $param,
        ]);

        if (!Circle::whereId($param->circle_id)->exists()) {
            throw new ModelNotFoundException("サークルが存在しません circleId=$param->circle_id");
        }

        $user = new User();
        $user->username = $param->username ?? Str::random(12);
        $user->email = $param->email;
        $user->active = true;
        $user->display_name = $param->display_name ? $param->display_name : $user->username;
        $user->createRememberToken();
        $user->createApiToken();

        DB::beginTransaction();
        try {
            $user->save();
            $user->circleUsers()->create([
                'circle_id' => $param->circle_id,
            ]);

            // 認証メールの通知
            event(new RegisteredCircleUser($user));

            DB::commit();
        } catch (Exception $e) {
            Log::error("CreateCircleUserUsecase [ERROR]", [
                'CreateCircleUserUsecaseParam' => $param,
            ]);

            DB::rollBack();
            throw $e;
        }
    }
}