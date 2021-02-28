<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("IndexCircleControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("testRequest");

        // GIVEN

        // WHEN
        $response = $this->get("/api/circle");

        // THEN
        $response->assertOk();
    }
}