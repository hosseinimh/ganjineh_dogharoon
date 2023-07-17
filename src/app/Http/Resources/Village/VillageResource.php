<?php

namespace App\Http\Resources\Village;

use Illuminate\Http\Resources\Json\JsonResource;

class VillageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'districtId' => intval($this->district_id),
            'districtName' => $this->getDistrictName($this->district_id)
        ];
    }

    private function getDistrictName($districtId)
    {
        if (in_array($districtId, [1, 2])) {
            return __('village.district_' . $districtId);
        }

        return __('village.district_undefined');
    }
}
