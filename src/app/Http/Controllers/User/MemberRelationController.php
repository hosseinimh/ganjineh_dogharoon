<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRelation\IndexMemberRelationsRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\MemberRelation\MemberRelationResource;
use App\Http\Resources\Relationship\RelationshipResource;
use App\Http\Resources\Village\VillageResource;
use App\Models\Member;
use App\Models\MemberRelation as Model;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use App\Services\RelationshipService;
use App\Services\VillageService;
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

    public function all(IndexMemberRelationsRequest $request): HttpJsonResponse
    {
        $villageService = new VillageService();
        $villageId = is_int($request->village_id) && $request->village_id > 0 ? $request->village_id : null;
        $villages = null;
        $name = is_string($request->name) ? $request->name : null;
        $family = is_string($request->family) ? $request->family : null;
        $nationalNo = intval($request->national_no) > 0 ? $request->national_no : null;
        $cardNo = intval($request->card_no) > 0 ? $request->card_no : null;
        if ($request->_pn === 1) {
            $villages = VillageResource::collection($villageService->getAll());
        }
        $items = MemberRelationResource::collection($this->service->getAll($villageId, $name, $family, $nationalNo, $cardNo, $request->_pn, $request->_pi));
        return $this->onItems(['items' => $items, 'villages' => $villages], $this->service->countAll($villageId, $name, $family, $nationalNo, $cardNo));
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

    public function showWithVillages(Model $model): HttpJsonResponse
    {
        $memberService = new MemberService();
        $villageService = new VillageService();
        $item = new MemberRelationResource($this->service->get($model->id));
        $maxCardNo = $memberService->maxCardNo();
        $villages = VillageResource::collection($villageService->getAll());
        return $this->onItems(['item' => $item, 'maxCardNo' => $maxCardNo, 'villages' => $villages]);
    }
}
