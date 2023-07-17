<?php

namespace App\Constants;

use ReflectionClass;

abstract class District
{
    const ALL = 0;
    const MARKAZI = 1;
    const MIAN_VELAYAT = 2;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
