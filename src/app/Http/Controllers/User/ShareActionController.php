<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShareAction\IndexShareActionsRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\ShareAction\ShareActionResource;
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

    public function index(IndexShareActionsRequest $request, Member $member): HttpJsonResponse
    {
        $member = new MemberResource($member);
        $items = ShareActionResource::collection($this->service->getPaginate($member->id, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'member' => $member], $this->service->count($member->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        $item = new ShareActionResource($this->service->get($model->id));
        $member = new MemberResource($item->member);
        return $this->onOk(['item' => $item, 'member' => $member]);
    }
}
