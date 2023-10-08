<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Facades\Helper;
use App\Models\Member;
use App\Models\MemberRelation as Model;
use App\Models\Relationship;
use Exception;
use Illuminate\Support\Facades\DB;

class MemberRelationService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_members', 'tbl_member_relations.member_id', '=', 'tbl_members.id')->join('tbl_relationships', 'tbl_member_relations.relationship_id', 'tbl_relationships.id')->leftJoin('tbl_villages', 'tbl_members.village_id', '=', 'tbl_villages.id')
            ->selectRaw('tbl_member_relations.*,tbl_members.name AS member_name,tbl_members.family AS member_family,tbl_members.national_no AS member_national_no,tbl_relationships.name AS relationship_name,tbl_villages.id AS village_id,tbl_villages.name as village_name')
            ->where('tbl_member_relations.id', $id)->first();
    }

    public function getByNationalNo(string $nationalNo): mixed
    {
        return Model::where('national_no', $nationalNo)->first();
    }

    public function getPaginate(int $memberId, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_relationships', 'tbl_member_relations.relationship_id', 'tbl_relationships.id')->where('member_id', $memberId)->select('tbl_member_relations.*', 'tbl_relationships.name AS relationship_name')->orderBy('family', 'ASC')->orderBy('tbl_member_relations.name', 'ASC')->orderBy('tbl_member_relations.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(int|null $villageId, string|null $name, string|null $family,  string|null $nationalNo, int|null $cardNo, int $page, int $pageItems): mixed
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($name) {
            $query->where(function ($query) use ($name) {
                $query->where('tbl_member_relations.name', 'LIKE', '%' . $name . '%');
            });
        }
        if ($family) {
            $query->where(function ($query) use ($family) {
                $query->where('tbl_member_relations.family', 'LIKE', '%' . $family . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('tbl_member_relations.national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($cardNo) {
            $query->where('card_no', $cardNo);
        }
        return $query->join('tbl_members', 'tbl_member_relations.member_id', '=', 'tbl_members.id')->join('tbl_relationships', 'tbl_member_relations.relationship_id', 'tbl_relationships.id')->leftJoin('tbl_villages', 'tbl_members.village_id', '=', 'tbl_villages.id')
            ->selectRaw('tbl_member_relations.*,tbl_members.name AS member_name,tbl_members.family AS member_family,tbl_members.national_no AS member_national_no,tbl_relationships.name AS relationship_name,tbl_villages.id AS village_id,tbl_villages.name as village_name')
            ->orderBy('tbl_members.family', 'ASC')->orderBy('tbl_members.name', 'ASC')->orderBy('tbl_members.id', 'ASC')->orderBy('tbl_member_relations.family', 'ASC')->orderBy('tbl_member_relations.name', 'ASC')->orderBy('tbl_member_relations.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $memberId, string $name, string $family, string $nationalNo, int $identityNo, string $birthDate, int $gender, int $relationshipId, string|null $description): mixed
    {
        $this->throwIfNationalNoNotUnique($nationalNo);
        $birthDate = substr($birthDate, 0, 4) . "/" . substr($birthDate, 4, 2) . "/" . substr($birthDate, 6);
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'identity_no' => $identityNo,
            'birth_date' => $birthDate,
            'gender' => $gender,
            'relationship_id' => $relationshipId,
            'description' => $description ?? '',
            'member_id' => $memberId,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $family, string $nationalNo, int $identityNo, string $birthDate, int $gender, int $relationshipId, string|null $description): bool
    {
        $this->throwIfNationalNoNotUnique($nationalNo, $model);
        $birthDate = substr($birthDate, 0, 4) . "/" . substr($birthDate, 4, 2) . "/" . substr($birthDate, 6);
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'identity_no' => $identityNo,
            'birth_date' => $birthDate,
            'gender' => $gender,
            'relationship_id' => $relationshipId,
            'description' => $description ?? '',
        ];
        return $model->update($data);
    }

    public function updateShares(Model $model, int $shares): bool
    {
        $data = [
            'shares' => $shares,
        ];
        return $model->update($data);
    }

    public function transferMemberToMemberRelation(Member $member, Member $parentMember, Relationship $relationship): mixed
    {
        $this->throwIfMemberAndParentMemberAreEqual($member, $parentMember->id);
        $this->throwIfHasMemberRelation($member);
        $shareActionService = new ShareActionService();
        $transferDescription = $member->transfer_description ? $member->transfer_description . '
****
' . __('member_relation.transfer_member_to_member_relation_description') : __('member_relation.transfer_member_to_member_relation_description');
        $transferDescription = str_replace(':field_1', $parentMember->name . ' ' . $parentMember->family, $transferDescription);
        $transferDescription = str_replace(':field_2', $parentMember->national_no, $transferDescription);
        $transferDescription = str_replace(':field_3', Helper::faDate3(date("Y-m-d H:i:s")), $transferDescription);
        $data = [
            'name' => $member->name,
            'family' => $member->family,
            'national_no' => $member->national_no,
            'identity_no' => $member->identity_no,
            'birth_date' => $member->birth_date,
            'gender' => $member->gender,
            'relationship_id' => $relationship->id,
            'transfer_description' => $transferDescription ?? '',
            'shares' => $member->shares ?? 0,
            'member_id' => $parentMember->id,
        ];
        DB::beginTransaction();
        $model = Model::create($data);
        if ($model && $shareActionService->updateOwner($member->id, 1, $model->id, 0) && $member->delete()) {
            DB::commit();
            return $model;
        }
        DB::rollBack();
        return null;
    }

    public function transferMemberRelationToNewMember(Model $model, Member $member): bool
    {
        if (intval($model->member_id) === intval($member->id)) {
            return true;
        }
        $transferDescription = $model->transfer_description ? $model->transfer_description . '
****
' . __('member_relation.transfer_member_relation_to_new_member_description') : __('member_relation.transfer_member_relation_to_new_member_description');
        $transferDescription = str_replace(':field_1', $model->member->name . ' ' . $model->member->family, $transferDescription);
        $transferDescription = str_replace(':field_2', $model->member->national_no, $transferDescription);
        $transferDescription = str_replace(':field_3', $member->name . ' ' . $member->family, $transferDescription);
        $transferDescription = str_replace(':field_4', $member->national_no, $transferDescription);
        $transferDescription = str_replace(':field_5', Helper::faDate3(date("Y-m-d H:i:s")), $transferDescription);
        $data = [
            'member_id' => $member->id,
            'transfer_description' => $transferDescription,
        ];
        return $model->update($data);
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    public function count(int $memberId): int
    {
        return Model::where('member_id', $memberId)->count();
    }

    public function countAll(int|null $villageId = null, string|null $name = null, string|null $family = null,  string|null $nationalNo = null, int|null $cardNo = null): int
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($name) {
            $query->where(function ($query) use ($name) {
                $query->where('tbl_member_relations.name', 'LIKE', '%' . $name . '%');
            });
        }
        if ($family) {
            $query->where(function ($query) use ($family) {
                $query->where('tbl_member_relations.family', 'LIKE', '%' . $family . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('tbl_member_relations.national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($cardNo) {
            $query->where('card_no', $cardNo);
        }
        return $query->join('tbl_members', 'tbl_member_relations.member_id', '=', 'tbl_members.id')->leftJoin('tbl_villages', 'tbl_members.village_id', '=', 'tbl_villages.id')
            ->count();
    }

    public function countInMembers(int|null $villageId = null, string|null $name = null, string|null $family = null, string|null $nationalNo = null, int|null $cardNo = null): int
    {
        return Model::whereIn('member_id', function ($query) use ($villageId, $name, $family, $nationalNo, $cardNo) {
            $query->select('id')->from(with(new Member())->getTable());
            if ($villageId) {
                $query->where('village_id', $villageId);
            }
            if ($name) {
                $query->where(function ($query) use ($name) {
                    $query->where('name', 'LIKE', '%' . $name . '%');
                });
            }
            if ($family) {
                $query->where(function ($query) use ($family) {
                    $query->where('family', 'LIKE', '%' . $family . '%');
                });
            }
            if ($nationalNo) {
                $query->where(function ($query) use ($nationalNo) {
                    $query->where('national_no', 'LIKE', '%' . $nationalNo . '%');
                });
            }
            if ($cardNo) {
                $query->where('card_no', $cardNo);
            }
        })->count();
    }

    public function totalShare(): int
    {
        return Model::sum('shares');
    }

    private function throwIfNationalNoNotUnique(string $nationalNo, Model|null $targetModel = null)
    {
        $member = $this->getByNationalNo($nationalNo);
        if (!$member || $targetModel?->id === $member->id) {
            return;
        }
        throw new Exception(__('member_relation.national_no_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfMemberAndParentMemberAreEqual(Member $member, int $parentMemberId)
    {
        if ($member->id !== $parentMemberId) {
            return;
        }
        throw new Exception(__('member_relation.member_and_parent_member_are_equal'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfHasMemberRelation(Member $member)
    {
        if ($member->memberRelations->count() === 0) {
            return;
        }
        throw new Exception(__('member.has_member_relations'), ErrorCode::CUSTOM_ERROR);
    }
}
