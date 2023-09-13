<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Models\Member as Model;
use App\Models\MemberRelation;
use App\Models\Village;
use App\Packages\JsonResponse;
use App\Services\MemberService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class MemberController extends Controller
{
    public function __construct(JsonResponse $response, public MemberService $service)
    {
        parent::__construct($response);
    }

    public function store(Village $village, StoreMemberRequest $request): HttpJsonResponse
    {
        $gender = in_array($request->gender, [1, 2]) ? $request->gender : 1;
        return $this->onStore($this->service->store($request->name, $request->family, $request->national_no, $request->identity_no, $request->father_name, $request->birth_date, $request->membership_date, $request->postal_code, $gender, $village->id, $request->tel, $request->mobile, $request->address, $request->description, $request->card_no));
    }

    public function update(Model $model, Village $village, UpdateMemberRequest $request): HttpJsonResponse
    {
        $gender = in_array($request->gender, [1, 2]) ? $request->gender : 1;
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->national_no, $request->identity_no, $request->father_name, $request->birth_date, $request->membership_date, $request->postal_code, $gender, $village->id, $request->tel, $request->mobile, $request->address, $request->description, $request->card_no));
    }

    public function changeMemberRelationToMember(MemberRelation $relationModel, Village $village, StoreMemberRequest $request): HttpJsonResponse
    {
        $gender = in_array($request->gender, [1, 2]) ? $request->gender : 1;
        return $this->onStore($this->service->changeMemberRelationToMember($relationModel, $request->name, $request->family, $request->national_no, $request->identity_no, $request->father_name, $request->birth_date, $request->membership_date, $request->postal_code, $gender, $village->id, $request->tel, $request->mobile, $request->address, $request->description, $request->card_no));
    }

    public function delete(Model $model): HttpJsonResponse
    {
        return $this->onDelete($this->service->delete($model));
    }
}
