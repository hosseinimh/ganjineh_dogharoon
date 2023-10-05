<?php

namespace App\Http\Requests\ShareAction;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateShareActionRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'transaction_date' => 'sometimes|required|numeric|gte:13000101',
            'invoice_no' => 'max:50',
            'price' => 'required|numeric|gte:0|lte:100000000',
            'description' => 'max:300',
        ];
    }

    public function messages()
    {
        return [
            'transaction_date.required' => __('share_action.transaction_date_required'),
            'transaction_date.numeric' => __('share_action.transaction_date_numeric'),
            'transaction_date.gte' => __('share_action.transaction_date_gte'),
            'invoice_no.max' => __('share_action.invoice_no_max'),
            'price.required' => __('share_action.price_required'),
            'price.numeric' => __('share_action.price_numeric'),
            'price.gte' => __('share_action.price_gte'),
            'price.lte' => __('share_action.price_lte'),
            'description.max' => __('share_action.description_max'),
        ];
    }
}
