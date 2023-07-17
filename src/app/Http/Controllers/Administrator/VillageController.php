<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Village\StoreVillageRequest;
use App\Http\Requests\Village\UpdateVillageRequest;
use App\Models\Village as Model;
use App\Packages\JsonResponse;
use App\Services\VillageService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class VillageController extends Controller
{
    public function __construct(JsonResponse $response, public VillageService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreVillageRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->district_id, $request->name));
    }

    public function update(Model $model, UpdateVillageRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->district_id, $request->name));
    }
}
