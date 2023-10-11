<?php

namespace App\Packages;

use App\Facades\Helper;
use App\Models\PrintShareAction as ModelsPrintShareAction;
use Exception;

class PrintShareAction
{
    public function store(int $ownerId, int $isMember): mixed
    {
        try {
            $data = [
                'owner_id' => $ownerId,
                'is_member' => $isMember,
                'user_id' => auth()->user()->id,
            ];
            ModelsPrintShareAction::create($data);
        } catch (Exception $e) {
            Helper::logError($e);
        }
        return null;
    }
}
