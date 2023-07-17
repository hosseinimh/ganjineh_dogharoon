<?php

namespace App\Http\Requests\Village;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateVillageRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'district_id' => 'required|numeric|min:1|max:2',
            'name' => 'required|min:2|max:50',
        ];
    }

    public function messages()
    {
        return [
            'district_id.required' => __('village.district_id_required'),
            'district_id.numeric' => __('village.district_id_numeric'),
            'district_id.min' => __('village.district_id_min'),
            'district_id.max' => __('village.district_id_max'),
            'name.required' => __('village.name_required'),
            'name.min' => __('village.name_min'),
            'name.max' => __('village.name_max'),
        ];
    }
}
