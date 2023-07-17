<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Bank\StoreBankRequest;
use App\Http\Requests\Bank\UpdateBankRequest;
use App\Models\Bank as Model;
use App\Packages\JsonResponse;
use App\Services\BankService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class BankController extends Controller
{
    public function __construct(JsonResponse $response, public BankService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreBankRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name));
    }

    public function update(Model $model, UpdateBankRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name));
    }
}
