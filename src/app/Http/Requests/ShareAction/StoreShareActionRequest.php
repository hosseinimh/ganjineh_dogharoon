<?php

namespace App\Http\Requests\ShareAction;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreShareActionRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'action_date' => 'required|numeric|gte:13000101',
            'action_type' => 'required|numeric|gte:1|lte:2',
            'count' => 'required|numeric|gt:0',
            'description' => 'max:300',
        ];
    }

    public function messages()
    {
        return [
            'action_date.required' => __('share_action.action_date_required'),
            'action_date.numeric' => __('share_action.action_date_numeric'),
            'action_date.gte' => __('share_action.action_date_gte'),
            'action_type.required' => __('share_action.action_type_required'),
            'action_type.numeric' => __('share_action.action_type_numeric'),
            'action_type.gte' => __('share_action.action_type_gte'),
            'action_type.lte' => __('share_action.action_type_lte'),
            'count.required' => __('share_action.count_required'),
            'count.numeric' => __('share_action.count_numeric'),
            'count.gt' => __('share_action.count_gt'),
            'description.max' => __('share_action.description_max'),
        ];
    }
}
