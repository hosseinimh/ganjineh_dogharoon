<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ErrorCode;
use App\Facades\ShareActionFacade;
use App\Http\Controllers\Controller;
use App\Http\Requests\ShareAction\StoreShareActionRequest;
use App\Http\Requests\ShareAction\UpdateShareActionRequest;
use App\Http\Resources\Bank\BankResource;
use App\Models\ShareAction as Model;
use App\Packages\JsonResponse;
use App\Services\BankService;
use App\Services\ShareActionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ShareActionController extends Controller
{
    public function __construct(JsonResponse $response, public ShareActionService $service)
    {
        parent::__construct($response);
    }

    public function getAddProps(int $ownerId, int $isMember): HttpJsonResponse
    {
        $owner = ShareActionFacade::getOwnerResource($ownerId, $isMember);
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $bankService = new BankService();
        $banks = BankResource::collection($bankService->getAll());
        return $this->onItems(['banks' => $banks, 'owner' => $owner]);
    }

    public function store(StoreShareActionRequest $request, int $ownerId, int $isMember): HttpJsonResponse
    {
        $owner = ShareActionFacade::getOwner($ownerId, $isMember);
        if (!$owner) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $bankId = intval($request->bank_id);
        if ($bankId > 0) {
            $bankService = new BankService();
            $bank = $bankService->get($bankId);
            if (!$bank) {
                return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
            }
            $bankId = $bank->id;
        } else {
            $bankId = null;
        }
        return $this->onStore($this->service->store($owner, $isMember, $request->action_date, $request->action_type, $request->transaction_date, $bankId, $request->invoice_no, $request->price, $request->description));
    }

    public function update(UpdateShareActionRequest $request, Model $model): HttpJsonResponse
    {
        $bankId = intval($request->bank_id);
        if ($bankId > 0) {
            $bankService = new BankService();
            $bank = $bankService->get($bankId);
            if (!$bank) {
                return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
            }
            $bankId = $bank->id;
        } else {
            $bankId = null;
        }
        return $this->onUpdate($this->service->update($model, $request->transaction_date, $bankId, $request->invoice_no, $request->price, $request->description));
    }
}
