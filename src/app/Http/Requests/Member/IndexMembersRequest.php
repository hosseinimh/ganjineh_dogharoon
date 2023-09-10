<?php

namespace App\Http\Requests\Member;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexMembersRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'village_id' => 'numeric|gte:0',
            'name' => 'max:50',
            'family' => 'max:50',
            'national_no' => 'max_digits:10',
            'card_no' => 'numeric|gte:0|max_digits:6',
        ];
    }

    public function messages()
    {
        return [
            'village_id.numeric' => __('member.village_id_numeric'),
            'village_id.gte' => __('member.village_id_gte'),
            'name.max' => __('member.name_max'),
            'family.max' => __('member.family_max'),
            'national_no.max_digits' => __('member.national_no_max_digits'),
            'card_no.numeric' => __('member.card_no_numeric'),
            'card_no.gte' => __('member.card_no_gte'),
            'card_no.max_digits' => __('member.card_no_max_digits'),
        ];
    }
}
