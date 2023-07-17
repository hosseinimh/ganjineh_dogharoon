<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Relationship\StoreRelationshipRequest;
use App\Http\Requests\Relationship\UpdateRelationshipRequest;
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

    public function store(StoreRelationshipRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name));
    }

    public function update(Model $model, UpdateRelationshipRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name));
    }
}
