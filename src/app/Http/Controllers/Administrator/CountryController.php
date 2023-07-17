<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Country\StoreCountryRequest;
use App\Http\Requests\Country\UpdateCountryRequest;
use App\Models\Country as Model;
use App\Packages\JsonResponse;
use App\Services\CountryService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CountryController extends Controller
{
    public function __construct(JsonResponse $response, public CountryService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreCountryRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name));
    }

    public function update(Model $model, UpdateCountryRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name));
    }
}
