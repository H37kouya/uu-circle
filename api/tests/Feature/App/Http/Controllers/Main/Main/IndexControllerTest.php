<?php

namespace Tests\Feature\App\Http\Controllers\Main\Main;

use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        // GIVEN

        // WHEN
        $response = $this->get('/api/main');

        // THEN
        $response->assertOk();
    }
}
