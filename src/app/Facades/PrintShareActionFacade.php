<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed store(int $ownerId, int $isMember)
 */
class PrintShareActionFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'print_share_action';
    }
}
