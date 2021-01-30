<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Usecases\Admin\DeleteCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Request;

class DeleteCircleNewJoyController extends Controller
{
    private DeleteCircleNewJoyUsecase $deleteCircleNewJoyUsecase;

    public function __construct(DeleteCircleNewJoyUsecase $deleteCircleNewJoyUsecase)
    {
        $this->deleteCircleNewJoyUsecase = $deleteCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $id
     * @param int $circleNewJoyId
     * @return bool[]
     * @throws Exception
     */
    public function __invoke(Request $request, int $id, int $circleNewJoyId): array
    {
        $this->deleteCircleNewJoyUsecase->invoke($id, $circleNewJoyId);

        return [
            'success' => true
        ];
    }
}