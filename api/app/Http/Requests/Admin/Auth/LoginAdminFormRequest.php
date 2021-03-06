<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\Property\UserProperty;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class LoginAdminFormRequest extends FormRequest
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
            'username_or_email'    => ['required', 'string'],
            UserProperty::password => ['required', 'string'],
        ]);
    }
}
