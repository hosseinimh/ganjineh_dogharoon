<?php

namespace App\Http\Resources\Country;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
        ];
    }
}
