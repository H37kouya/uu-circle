<?php

namespace App\Http\Requests\Admin\Advertise;

use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class UpdateAdvertiseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Arr::camel_keys([
            'title'          => 'required|string|max:255',
            'link'           => 'nullable|string|max:255|url',
            'main_image_url' => 'nullable|string|max:255|url',
            'active'         => 'nullable|boolean',
            'publish_from'   => 'nullable|date|date_format:Y-m-d',
            'publish_to'     => 'nullable|date|date_format:Y-m-d|after:publish_from',
        ]);
    }

    public function makeAdvertise(): Advertise
    {
        $request = Arr::snake_keys($this->validated());

        return (new Advertise())->fill([
            'title'          => $request['title'],
            'link'           => $request['link'],
            'main_image_url' => $request['main_image_url'],
            'active'         => $request['active'],
            'publish_to'     => $request['publish_to'] ? new Carbon($request['publish_to']) : null,
            'publish_from'   => $request['publish_from'] ? new Carbon($request['publish_from']) : null,
        ]);
    }
}
