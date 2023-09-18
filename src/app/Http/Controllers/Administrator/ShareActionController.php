<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ShareAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShareAction\StoreShareActionRequest;
use App\Http\Requests\ShareAction\UpdateShareActionRequest;
use App\Models\Member;
use App\Models\ShareAction as Model;
use App\Packages\JsonResponse;
use App\Services\ShareActionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ShareActionController extends Controller
{
    public function __construct(JsonResponse $response, public ShareActionService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreShareActionRequest $request, Member $member): HttpJsonResponse
    {
        return $this->onStore($this->service->store($member, $request->action_date, ShareAction::getValue($request->action_type), $request->count, $request->description));
    }

    public function update(UpdateShareActionRequest $request, Model $model): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->action_date, ShareAction::getValue($request->action_type), $request->count, $request->description));
    }
}
