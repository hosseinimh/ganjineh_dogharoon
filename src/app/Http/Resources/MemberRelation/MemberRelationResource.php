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
            'description' => $this->description ?? '',
            'memberId' => intval($this->member_id),
        ];
    }
}
