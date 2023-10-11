<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Facades\ShareActionFacade;
use App\Http\Controllers\Controller;
use App\Http\Requests\PrintShareAction\IndexPrintShareActionsRequest;
use App\Http\Resources\PrintShareAction\PrintShareActionResource;
use App\Packages\JsonResponse;
use App\Services\PrintShareActionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class PrintShareActionController extends Controller
{
    public function __construct(JsonResponse $response, public PrintShareActionService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexPrintShareActionsRequest $request, int $ownerId, int $isMember): HttpJsonResponse
    {
        $owner = ShareActionFacade::getOwnerResource($ownerId, $isMember);
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $items = PrintShareActionResource::collection($this->service->getPaginate($owner->id, $isMember, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'owner' => $owner], $this->service->count($owner->id, $isMember));
    }
}
