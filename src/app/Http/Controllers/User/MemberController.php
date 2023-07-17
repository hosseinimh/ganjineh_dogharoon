<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\IndexMembersRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\Relationship\RelationshipResource;
use App\Http\Resources\Village\VillageResource;
use App\Models\Member as Model;
use App\Packages\JsonResponse;
use App\Services\MemberService;
use App\Services\RelationshipService;
use App\Services\VillageService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class MemberController extends Controller
{
    public function __construct(JsonResponse $response, public MemberService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexMembersRequest $request): HttpJsonResponse
    {
        $villageService = new VillageService();
        $villageId = is_int($request->village_id) && $request->village_id > 0 ? $request->village_id : null;
        $nameFamily = is_string($request->name_family) ? $request->name_family : null;
        $nationalNo = is_int($request->national_no) && $request->national_no > 0 ? $request->national_no : null;
        $memberNo = is_int($request->member_no) && $request->member_no > 0 ? $request->member_no : null;
        $members = MemberResource::collection($this->service->getPaginate($villageId, $nameFamily, $nationalNo, $memberNo, $request->_pn, $request->_pi));
        $villages = VillageResource::collection($villageService->getAll());
        return $this->onItems(['items' => $members, 'villages' => $villages], $this->service->count($villageId, $nameFamily, $nationalNo, $memberNo));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function showWithVillages(Model $model): HttpJsonResponse
    {
        $villageService = new VillageService();
        $item = new MemberResource($this->service->get($model->id));
        $villages = VillageResource::collection($villageService->getAll());
        return $this->onItems(['item' => $item, 'villages' => $villages]);
    }

    public function showWithRelationships(Model $model): HttpJsonResponse
    {
        $relationshipService = new RelationshipService();
        $item = new MemberResource($this->service->get($model->id));
        $relationships = RelationshipResource::collection($relationshipService->getAll());
        return $this->onItems(['item' => $item, 'relationships' => $relationships]);
    }
}
