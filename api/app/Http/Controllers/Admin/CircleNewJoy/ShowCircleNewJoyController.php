<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;

class ShowCircleNewJoyController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $id
     * @param int $circleNewJoyId
     * @return array
     */
    public function __invoke(Request $request, int $id, int $circleNewJoyId): array
    {
        $circle = Circle::findOrFail($id);
        $circleNewJoy = CircleNewJoy::whereCircleId($id)->findOrFail($circleNewJoyId);

        return [
            'circle' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation
            )->toArray()),

            'circleNewJoy' => Arr::camel_keys($circleNewJoy->toArray()),
        ];
    }
}