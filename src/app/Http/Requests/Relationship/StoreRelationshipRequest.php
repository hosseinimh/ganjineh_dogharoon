<?php

namespace App\Http\Requests\Relationship;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreRelationshipRequest extends FormRequest
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
            'name.required' => __('relationship.name_required'),
            'name.min' => __('relationship.name_min'),
            'name.max' => __('relationship.name_max'),
        ];
    }
}
