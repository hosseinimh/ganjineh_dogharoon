<?php

namespace App\Http\Resources\MemberRelation;

use Illuminate\Http\Resources\Json\JsonResource;

class MemberRelationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'family' => $this->family ?? '',
            'nationalNo' => $this->national_no,
            'identityNo' => $this->identity_no,
            'birthDate' => $this->birth_date,
            'gender' => intval($this->gender),
            'relationshipId' => intval($this->relationship_id),
            'relationshipName' => $this->relationship_name,
            'memberId' => intval($this->member_id),
            'memberName' => $this->member_name ?? '',
            'memberFamily' => $this->member_family ?? '',
            'memberNationalNo' => $this->member_national_no ?? '',
            'villageId' => intval($this->village_id),
            'villageName' => $this->village_name ?? '',
            'description' => $this->description ?? '',
            'transferDescription' => $this->transfer_description ?? '',
        ];
    }
}
