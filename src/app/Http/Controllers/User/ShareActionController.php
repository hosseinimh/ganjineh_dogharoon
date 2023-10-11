<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Facades\PrintShareActionFacade;
use App\Facades\ShareActionFacade;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShareAction\IndexShareActionsRequest;
use App\Http\Resources\ShareAction\ShareActionResource;
use App\Models\ShareAction as Model;
use App\Packages\JsonResponse;
use App\Services\SettingsService;
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
        $owner = ShareActionFacade::getOwnerResource($ownerId, $isMember);
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $items = ShareActionResource::collection($this->service->getPaginate($owner->id, $isMember, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'owner' => $owner], $this->service->count($owner->id, $isMember));
    }

    public function show(Model $model): HttpJsonResponse
    {
        $item = new ShareActionResource($model);
        $owner = ShareActionFacade::getOwnerResource($model->owner_id, $model->is_member);
        return $this->onOk(['item' => $item, 'owner' => $owner]);
    }

    public function printPage1(int $oid, int $m)
    {
        $owner = ShareActionFacade::getOwner($oid, $m);
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $shareActionService = new ShareActionService();
        $shareAction = $shareActionService->getLast($oid, $m);
        $price = $shareAction ? $shareAction->price : 0;
        $settingsService = new SettingsService();
        $settings = $settingsService->get();
        PrintShareActionFacade::store($oid, $m);
        return view('print.share_actions.page_1', ['owner' => $owner, 'isMember' => $m, 'price' => $price, 'settings' => $settings]);
    }
}
