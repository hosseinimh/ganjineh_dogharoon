<?php

namespace App\Http\Requests\Member;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class TransferMemberRelationToMemberRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'father_name' => 'required|min:2|max:50',
            'membership_date' => 'required|numeric|gte:13800101',
            'postal_code' => 'max_digits:10',
            'tel' => 'max:50',
            'mobile' => 'max:50',
            'address' => 'max:300',
            'description' => 'max:300',
            'card_no' => 'required|numeric|gt:0|unique:tbl_members',
        ];
    }

    public function messages()
    {
        return [
            'father_name.required' => __('member.father_name_required'),
            'father_name.min' => __('member.father_name_min'),
            'father_name.max' => __('member.father_name_max'),
            'membership_date.required' => __('member.membership_date_required'),
            'membership_date.numeric' => __('member.membership_date_numeric'),
            'membership_date.gte' => __('member.membership_date_gte'),
            'postal_code.max_digits' => __('member.postal_code_max_digits'),
            'tel.max' => __('member.tel_max'),
            'mobile.max' => __('member.mobile_max'),
            'address.max' => __('member.address_max'),
            'description.max' => __('member.description_max'),
            'card_no.required' => __('member.card_no_required'),
            'card_no.numeric' => __('member.card_no_numeric'),
            'card_no.gt' => __('member.card_no_gt'),
            'card_no.unique' => __('member.card_no_unique'),
        ];
    }
}
