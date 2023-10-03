<?php

namespace App\Constants;

use Exception;
use ReflectionClass;

abstract class ShareActionType
{
    const BUY = 1;
    const SELL = 2;
    const REFUND = 3;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }

    public static function getValue($value)
    {
        $constants = self::toArray();
        foreach ($constants as $constant) {
            if ($constant === $value) {
                return $value;
            }
        }

        throw new Exception(__('general.item_not_found'), ErrorCode::ITEM_NOT_FOUND);
    }
}
