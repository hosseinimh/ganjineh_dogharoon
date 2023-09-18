<?php

namespace App\Http\Resources\Member;

use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'family' => $this->family ?? '',
            'nationalNo' => $this->national_no,
            'identityNo' => $this->identity_no,
            'fatherName' => $this->father_name ?? '',
            'birthDate' => $this->birth_date,
            'membershipDate' => $this->membership_date,
            'postalCode' => intval($this->postal_code),
            'gender' => intval($this->gender),
            'villageId' => intval($this->village_id),
            'villageName' => $this->village_name ?? '',
            'tel' => $this->tel ?? '',
            'mobile' => $this->mobile ?? '',
            'address' => $this->address ?? '',
            'description' => $this->description ?? '',
            'shares' => intval($this->shares),
            'cardNo' => intval($this->card_no),
            'memberRelationsCount' => intval($this->member_relations_count),
        ];
    }
}
