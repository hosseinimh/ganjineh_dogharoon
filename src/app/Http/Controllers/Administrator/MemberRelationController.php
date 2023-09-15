<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRelation\StoreMemberRelationRequest;
use App\Http\Requests\MemberRelation\UpdateMemberRelationRequest;
use App\Models\Member;
use App\Models\MemberRelation as Model;
use App\Models\Relationship;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class MemberRelationController extends Controller
{
    public function __construct(JsonResponse $response, public MemberRelationService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreMemberRelationRequest $request, Member $member, Relationship $relationship): HttpJsonResponse
    {
        $gender = in_array($request->gender, [1, 2]) ? $request->gender : 1;
        return $this->onStore($this->service->store($member->id, $request->name, $request->family, $request->national_no, $request->identity_no, $request->birth_date, $gender, $relationship->id, $request->description));
    }

    public function update(UpdateMemberRelationRequest $request, Model $model, Relationship $relationship): HttpJsonResponse
    {
        $gender = in_array($request->gender, [1, 2]) ? $request->gender : 1;
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->national_no, $request->identity_no, $request->birth_date, $gender, $relationship->id, $request->description));
    }

    public function transferMemberToMemberRelation(Member $member, Member $parentMember, Relationship $relationship): HttpJsonResponse
    {
        return $this->onStore($this->service->transferMemberToMemberRelation($member, $parentMember->id, $relationship));
    }

    public function transferMemberRelationToNewMember(Model $model, Member $member): HttpJsonResponse
    {
        return $this->onUpdate($this->service->transferMemberRelationToNewMember($model, $member));
    }

    public function delete(Model $model): HttpJsonResponse
    {
        return $this->onDelete($this->service->delete($model));
    }
}
