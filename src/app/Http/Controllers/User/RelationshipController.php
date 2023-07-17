<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Relationship\IndexRelationshipsRequest;
use App\Models\Relationship as Model;
use App\Packages\JsonResponse;
use App\Services\RelationshipService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class RelationshipController extends Controller
{
    public function __construct(JsonResponse $response, public RelationshipService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexRelationshipsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->count());
    }

    public function showAll(): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll(), $this->service->count());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
