<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRelation\IndexMemberRelationsRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\MemberRelation\MemberRelationResource;
use App\Http\Resources\Relationship\RelationshipResource;
use App\Models\Member;
use App\Models\MemberRelation as Model;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use App\Services\RelationshipService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class MemberRelationController extends Controller
{
    public function __construct(JsonResponse $response, public MemberRelationService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexMemberRelationsRequest $request, Member $member): HttpJsonResponse
    {
        $member = new MemberResource($member);
        $items = MemberRelationResource::collection($this->service->getPaginate($member->id, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'member' => $member], $this->service->count($member->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function showWithRelationships(Model $model): HttpJsonResponse
    {
        $memberService = new MemberService();
        $relationshipService = new RelationshipService();
        $member = $memberService->get($model->member_id);
        if (!$member) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        $member = new MemberResource($member);
        $item = new MemberRelationResource($this->service->get($model->id));
        $relationships = RelationshipResource::collection($relationshipService->getAll());
        return $this->onItems(['item' => $item, 'member' => $member, 'relationships' => $relationships]);
    }
}
