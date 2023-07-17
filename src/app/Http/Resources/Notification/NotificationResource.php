<?php

namespace App\Http\Resources\Notification;

use App\Constants\NotificationSubCaegory;
use App\Constants\UserVerificationRejectReason;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'type' => intval($this->type),
            'category' => intval($this->category),
            'subCategory' => intval($this->sub_category),
            'subCategoryTitle' => $this->getSubCategoryTitle(intval($this->sub_category)),
            'subCategoryText' => $this->getSubCategoryText(intval($this->sub_category)),
            'messageFields' => $this->message_fields,
            'messageFieldsText' => $this->getMessageFieldsText($this->message_fields, $this->sub_category),
            'priority' => intval($this->priority),
            'userId' => intval($this->user_id),
            'seenAt' => $this->seen_at,
            'createdAt' => date_format($this->created_at, 'Y-m-d H:i:s'),
        ];
    }

    private function getSubCategoryTitle(int $subCategory)
    {
        $text = __('notification.sub_category_undefined');
        if (in_array($subCategory, NotificationSubCaegory::toArray())) {
            $text = __('notification.sub_category_' . $subCategory);
        }
        return $text;
    }

    private function getSubCategoryText(int $subCategory)
    {
        $text = __('notification.sub_category_text_undefined');
        if (in_array($subCategory, NotificationSubCaegory::toArray())) {
            $text = __('notification.sub_category_text_' . $subCategory);
        }
        return $text;
    }

    private function getMessageFieldsText(string $messageFields, int $subCategory)
    {
        if ($subCategory === NotificationSubCaegory::USER_VERIFICATION_REJECTED) {
            $messageFieldsArray = explode('|', $messageFields);
            if (count($messageFieldsArray) === 2) {
                return implode('|', [$messageFieldsArray[0], $this->getUserVerificationRejectReasonText($messageFieldsArray[1])]);
            }
        }
        return $messageFields;
    }

    private function getUserVerificationRejectReasonText(int $rejectReason)
    {
        $text = __('user.reject_reason_undefined');
        if (in_array($rejectReason, UserVerificationRejectReason::toArray())) {
            $text = __('user.reject_reason_' . $rejectReason);
        }
        return $text;
    }
}
