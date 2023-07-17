<?php

namespace App\Http\Requests\Bank;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreBankRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:2|max:50',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('bank.name_required'),
            'name.min' => __('bank.name_min'),
            'name.max' => __('bank.name_max'),
        ];
    }
}
