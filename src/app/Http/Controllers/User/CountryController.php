<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Country\IndexCountriesRequest;
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

    public function index(IndexCountriesRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->count());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
