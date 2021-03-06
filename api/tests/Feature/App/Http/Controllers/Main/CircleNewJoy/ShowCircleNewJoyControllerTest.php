<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Models\Circle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class ShowCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('ShowCircleNewJoyControllerTest');
        Cache::clear();
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
        Http::fake();
        $circle = Circle::whereRelease(true)
            ->hasByNonDependentSubquery('circleNewJoys')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        $circleNewJoy = $circle->circleNewJoys()->first();
        Log::info($circleNewJoy);
        $this->assertNotNull($circleNewJoy);

        // WHEN
        $response = $this->get("/api/circle/$circle->slug/newjoy/$circleNewJoy->circleNewJoyId");

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
