<?php

namespace App\Http\Resources\PrintShareAction;

use Illuminate\Http\Resources\Json\JsonResource;

class PrintShareActionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'ownerId' => intval($this->owner_id),
            'isMember' => intval($this->is_member),
            'userId' => intval($this->user_id),
            'userName' => $this->user_name,
            'userFamily' => $this->user_family,
            'createdAt' => date_format($this->created_at, 'Y-m-d H:i:s'),
        ];
    }
}
