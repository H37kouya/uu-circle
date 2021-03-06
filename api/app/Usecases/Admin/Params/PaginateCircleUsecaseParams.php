<?php

declare(strict_types=1);

namespace App\Usecases\Admin\Params;

final class PaginateCircleUsecaseParams
{
    public ?int $id;
    public ?string $updated_at;
    public bool $previous;
    public bool $next;
    public ?string $name;
}
