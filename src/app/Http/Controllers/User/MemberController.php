<?php

namespace App\Http\Controllers\User;

use App\Facades\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\IndexMembersRequest;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\Relationship\RelationshipResource;
use App\Http\Resources\Village\VillageResource;
use App\Models\Member as Model;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use App\Services\RelationshipService;
use App\Services\VillageService;
use DateTime;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class MemberController extends Controller
{
    public function __construct(JsonResponse $response, public MemberService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexMembersRequest $request): HttpJsonResponse
    {
        $memberRelationService = new MemberRelationService();
        $villageService = new VillageService();
        $villageId = is_int($request->village_id) && $request->village_id > 0 ? $request->village_id : null;
        $name = is_string($request->name) ? $request->name : null;
        $family = is_string($request->family) ? $request->family : null;
        $nationalNo = intval($request->national_no) > 0 ? $request->national_no : null;
        $cardNo = intval($request->card_no) > 0 ? $request->card_no : null;
        $members = MemberResource::collection($this->service->getPaginate($villageId, $name, $family, $nationalNo, $cardNo, $request->_pn, $request->_pi));
        $villages = VillageResource::collection($villageService->getAll());
        $memberRelationsCount = $memberRelationService->countInMembers($villageId, $name, $family, $nationalNo, $cardNo);
        return $this->onItems(['items' => $members, 'villages' => $villages, 'memberRelationsCount' => $memberRelationsCount], $this->service->count($villageId, $name, $family, $nationalNo, $cardNo));
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

    public function print(IndexMembersRequest $request)
    {
        $memberRelationService = new MemberRelationService();
        $villageId = intval($request->village_id) > 0 ? $request->village_id : null;
        $name = is_string($request->name) ? $request->name : null;
        $family = is_string($request->family) ? $request->family : null;
        $nationalNo = intval($request->national_no) > 0 ? $request->national_no : null;
        $cardNo = intval($request->card_no) > 0 ? $request->card_no : null;
        $members = MemberResource::collection($this->service->getAll($villageId, $name, $family, $nationalNo, $cardNo));
        $count = $this->service->count($villageId, $name, $family, $nationalNo, $cardNo);
        $memberRelationsCount = $memberRelationService->countInMembers($villageId, $name, $family, $nationalNo, $cardNo);
        $date = Helper::faDate(date("Y-m-d H:i:s"));
        $mobile = intval($request->mobile) === 1 ? 1 : 0;
        return view('print.members', ['members' => $members, 'count' => $count, 'memberRelationsCount' => $memberRelationsCount, 'date' => $date, 'mobile' => $mobile]);
    }
}
