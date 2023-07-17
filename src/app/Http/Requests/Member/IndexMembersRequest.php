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
            'name_family' => 'max:50',
            'member_no' => 'numeric|gte:0',
        ];
    }

    public function messages()
    {
        return [
            'village_id.numeric' => __('member.village_id_numeric'),
            'village_id.gte' => __('member.village_id_gte'),
            'name_family.max' => __('member.name_family_max'),
            'member_no.numeric' => __('member.member_no_numeric'),
            'member_no.gte' => __('member.member_no_gte'),
        ];
    }
}
