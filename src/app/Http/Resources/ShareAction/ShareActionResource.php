<?php

namespace App\Http\Resources\ShareAction;

use App\Constants\ShareActionType;
use Illuminate\Http\Resources\Json\JsonResource;

class ShareActionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'actionDate' => $this->action_date,
            'actionType' => intval($this->action_type),
            'actionTypeText' => $this->getActionTypeText(intval($this->action_type)),
            'transactionDate' => $this->transaction_date,
            'bankId' => $this->bank_id ? intval($this->bank_id) : 0,
            'invoiceNo' => $this->invoice_no ?? '',
            'price' => intval($this->price),
            'ownerId' => intval($this->owner_id),
            'isMember' => intval($this->is_member),
            'shares' => intval($this->shares),
            'description' => $this->description ?? '',
        ];
    }

    private function getActionTypeText(int $actionType)
    {
        $text = __('share_action.action_type_undefined');
        if (in_array($actionType, ShareActionType::toArray())) {
            $text = __('share_action.action_type_' . $actionType);
        }
        return $text;
    }
}
