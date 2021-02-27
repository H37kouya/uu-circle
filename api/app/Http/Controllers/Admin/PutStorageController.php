<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use Illuminate\Support\Facades\Storage;

class PutStorageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param AdminPutStorageRequest $request
     * @return array
     */
    public function __invoke(AdminPutStorageRequest $request): array
    {
        $filename = $request->file('file')->store('/images');
        $url = Storage::url($filename);

        return [
            'url' => $url,
        ];
    }
}
