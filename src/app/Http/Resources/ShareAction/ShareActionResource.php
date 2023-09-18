<?php

namespace App\Http\Resources\ShareAction;

use App\Constants\ShareAction;
use Illuminate\Http\Resources\Json\JsonResource;

class ShareActionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'actionType' => intval($this->action_type),
            'actionTypeText' => $this->getActionTypeText(intval($this->action_type)),
            'actionDate' => $this->action_date,
            'count' => intval($this->count),
            'memberId' => intval($this->member_id),
            'description' => $this->description ?? '',
        ];
    }

    private function getActionTypeText(int $actionType)
    {
        $text = __('share_action.action_type_undefined');
        if (in_array($actionType, ShareAction::toArray())) {
            $text = __('share_action.action_type_' . $actionType);
        }
        return $text;
    }
}
