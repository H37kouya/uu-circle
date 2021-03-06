<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Circle;

use App\Enum\Property\UserProperty;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class ShowCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('ShowCircleControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info('testRequest');

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers')
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    /** @var \App\Models\Circle $query */
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);
        $circleUser = $user->circleUsers()->inRandomOrder()->first();
        $this->assertNotNull($circleUser);

        // WHEN
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
    }
}
