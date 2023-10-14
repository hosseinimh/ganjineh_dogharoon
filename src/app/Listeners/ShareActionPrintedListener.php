<?php

namespace App\Listeners;

use App\Events\ShareActionPrinted;
use App\Services\ShareActionService;

class ShareActionPrintedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ShareActionPrinted  $event
     * @return void
     */
    public function handle(ShareActionPrinted $event)
    {
        $shareActionService = new ShareActionService();
        $shareActionService->onShareActionPrinted($event->ownerId, $event->isMember);
    }
}
