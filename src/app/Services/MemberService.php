<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Facades\Helper;
use App\Models\Error;
use App\Models\Member as Model;
use App\Models\MemberRelation;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;

class MemberService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getByNationalNo(string $nationalNo): mixed
    {
        return Model::where('national_no', $nationalNo)->first();
    }

    public function getByCardNo(int $cardNo): mixed
    {
        return Model::where('card_no', $cardNo)->first();
    }

    public function getPaginate(int|null $villageId, string|null $name, string|null $family,  string|null $nationalNo, int|null $cardNo, int $page, int $pageItems): mixed
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($name) {
            $query->where(function ($query) use ($name) {
                $query->where('tbl_members.name', 'LIKE', '%' . $name . '%');
            });
        }
        if ($family) {
            $query->where(function ($query) use ($family) {
                $query->where('tbl_members.family', 'LIKE', '%' . $family . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('tbl_members.national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($cardNo) {
            $query->where('card_no', $cardNo);
        }
        return $query->leftJoin('tbl_member_relations', 'tbl_members.id', '=', 'tbl_member_relations.member_id')->leftJoin('tbl_villages', 'tbl_members.village_id', '=', 'tbl_villages.id')
            ->selectRaw('tbl_members.*,count(tbl_member_relations.id) as member_relations_count,tbl_villages.name as village_name')->whereNull('tbl_member_relations.deleted_at')
            ->groupBy('tbl_members.id')->orderBy('tbl_members.family', 'ASC')->orderBy('tbl_members.name', 'ASC')->orderBy('tbl_members.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(int|null $villageId, string|null $name, string|null $family,  string|null $nationalNo, int|null $cardNo): mixed
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($name) {
            $query->where(function ($query) use ($name) {
                $query->where('tbl_members.name', 'LIKE', '%' . $name . '%');
            });
        }
        if ($family) {
            $query->where(function ($query) use ($family) {
                $query->where('tbl_members.family', 'LIKE', '%' . $family . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('tbl_members.national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($cardNo) {
            $query->where('card_no', $cardNo);
        }
        return $query->leftJoin('tbl_member_relations', 'tbl_members.id', '=', 'tbl_member_relations.member_id')->leftJoin('tbl_villages', 'tbl_members.village_id', '=', 'tbl_villages.id')
            ->selectRaw('tbl_members.*,count(tbl_member_relations.id) as member_relations_count,tbl_villages.name as village_name')->whereNull('tbl_member_relations.deleted_at')
            ->groupBy('tbl_members.id')->orderBy('tbl_members.family', 'ASC')->orderBy('tbl_members.name', 'ASC')->orderBy('tbl_members.id', 'ASC')->get();
    }

    public function store(string $name, string $family, string $nationalNo, int $identityNo, string $fatherName, string $birthDate, string $membershipDate, int|null $postalCode, int $gender, int $villageId, string|null $tel, string|null $mobile, string|null $address, string|null $description, int $cardNo): mixed
    {
        $this->throwIfNationalNoNotUnique($nationalNo);
        $this->throwIfCardNoNotUnique($cardNo);
        $birthDate = substr($birthDate, 0, 4) . "/" . substr($birthDate, 4, 2) . "/" . substr($birthDate, 6);
        $membershipDate = substr($membershipDate, 0, 4) . "/" . substr($membershipDate, 4, 2) . "/" . substr($membershipDate, 6);
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'identity_no' => $identityNo,
            'father_name' => $fatherName,
            'birth_date' => $birthDate,
            'membership_date' => $membershipDate,
            'postal_code' => $postalCode ?? '',
            'gender' => $gender,
            'village_id' => $villageId,
            'tel' => $tel ?? '',
            'mobile' => $mobile ?? '',
            'address' => $address ?? '',
            'description' => $description ?? '',
            'card_no' => $cardNo,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $family, string $nationalNo, int $identityNo, string $fatherName, string $birthDate, string $membershipDate, int|null $postalCode, int $gender, int $villageId, string|null $tel, string|null $mobile, string|null $address, string|null $description, int $cardNo): bool
    {
        $this->throwIfNationalNoNotUnique($nationalNo, $model);
        $this->throwIfCardNoNotUnique($cardNo, $model);
        $birthDate = substr($birthDate, 0, 4) . "/" . substr($birthDate, 4, 2) . "/" . substr($birthDate, 6);
        $membershipDate = substr($membershipDate, 0, 4) . "/" . substr($membershipDate, 4, 2) . "/" . substr($membershipDate, 6);
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'identity_no' => $identityNo,
            'father_name' => $fatherName,
            'birth_date' => $birthDate,
            'membership_date' => $membershipDate,
            'postal_code' => $postalCode ?? '',
            'gender' => $gender,
            'village_id' => $villageId,
            'tel' => $tel ?? '',
            'mobile' => $mobile ?? '',
            'address' => $address ?? '',
            'description' => $description ?? '',
            'card_no' => $cardNo,
        ];

        return $model->update($data);
    }

    public function changeMemberToMemberRelation(Model $model, int $memberId, string $name, string $family, string $nationalNo, int $identityNo, string $birthDate, int $gender, int $relationshipId, string|null $description): mixed
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

    public function transferMemberRelationToMember(MemberRelation $relationModel, string $fatherName, string $membershipDate, int|null $postalCode, int $villageId, string|null $tel, string|null $mobile, string|null $address, string|null $description, int $cardNo): mixed
    {
        $this->throwIfNationalNoNotUnique($relationModel->national_no);
        $membershipDate = substr($membershipDate, 0, 4) . "/" . substr($membershipDate, 4, 2) . "/" . substr($membershipDate, 6);
        $description = $description . '

----

' . __('member.transfer_member_relation_to_member_description');
        $description = str_replace(':field_1', $relationModel->member->name . ' ' . $relationModel->member->family, $description);
        $description = str_replace(':field_2', $relationModel->member->national_no, $description);
        $description = str_replace(':field_3', Helper::faDate3(date("Y-m-d H:i:s")), $description);
        $data = [
            'name' => $relationModel->name,
            'family' => $relationModel->family,
            'national_no' => $relationModel->national_no,
            'identity_no' => $relationModel->identity_no,
            'father_name' => $fatherName,
            'birth_date' => $relationModel->birth_date,
            'membership_date' => $membershipDate,
            'postal_code' => $postalCode ?? '',
            'gender' => $relationModel->gender,
            'village_id' => $villageId,
            'tel' => $tel ?? '',
            'mobile' => $mobile ?? '',
            'address' => $address ?? '',
            'description' => $description ?? '',
            'card_no' => $cardNo,
        ];
        DB::beginTransaction();
        $model = Model::create($data);
        if ($model && $relationModel->delete()) {
            DB::commit();
            return $model;
        }
        DB::rollBack();
        return null;
    }

    public function delete(Model $model): bool
    {
        $this->throwIfHasMemberRelation($model);
        return $model->delete();
    }

    public function count(int|null $villageId, string|null $name, string|null $family, string|null $nationalNo, int|null $cardNo): int
    {
        $query = Model::query();
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
        return $query->count();
    }

    public function maxCardNo(): int
    {
        return Model::max('card_no');
    }

    private function throwIfNationalNoNotUnique(string $nationalNo, Model|null $targetModel = null)
    {
        $member = $this->getByNationalNo($nationalNo);
        if (!$member || $targetModel?->id === $member->id) {
            return;
        }
        throw new Exception(__('member.national_no_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfCardNoNotUnique(string $cardNo, Model|null $targetModel = null)
    {
        $member = $this->getByCardNo($cardNo);
        if (!$member || $targetModel?->id === $member->id) {
            return;
        }
        throw new Exception(__('member.card_no_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfHasMemberRelation(Model $model)
    {
        if ($model->memberRelations->count() === 0) {
            return;
        }
        throw new Exception(__('member.has_member_relations'), ErrorCode::CUSTOM_ERROR);
    }
}
