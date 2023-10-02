<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShareAction\IndexShareActionsRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\MemberRelation\MemberRelationResource;
use App\Http\Resources\ShareAction\ShareActionResource;
use App\Models\ShareAction as Model;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use App\Services\ShareActionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ShareActionController extends Controller
{
    public function __construct(JsonResponse $response, public ShareActionService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexShareActionsRequest $request, int $ownerId, int $isMember): HttpJsonResponse
    {
        if ($isMember === 0) {
            $service = new MemberRelationService();
            $owner = $service->get($ownerId);
            if (!$owner) {
                return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
            }
            $owner = new MemberRelationResource($owner);
        } else if ($isMember === 1) {
            $service = new MemberService();
            $owner = $service->get($ownerId);
            if (!$owner) {
                return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
            }
            $owner = new MemberResource($owner);
        }
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $items = ShareActionResource::collection($this->service->getPaginate($owner->id, $isMember, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'owner' => $owner], $this->service->count($owner->id, $isMember));
    }

    public function show(Model $model): HttpJsonResponse
    {
        $item = new ShareActionResource($this->service->get($model->id));
        $member = new MemberResource($item->member);
        return $this->onOk(['item' => $item, 'member' => $member]);
    }
}
