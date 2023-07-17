<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\Member as Model;
use Exception;

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

    public function getByMemberNo(int $memberNo): mixed
    {
        return Model::where('member_no', $memberNo)->first();
    }

    public function getPaginate(int|null $villageId, string|null $nameFamily, int|null $nationalNo, int|null $memberNo, int $page, int $pageItems): mixed
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($nameFamily) {
            $query->where(function ($query) use ($nameFamily) {
                $query->where('tbl_members.name', 'LIKE', '%' . $nameFamily . '%')->orWhere('tbl_members.family', 'LIKE', '%' . $nameFamily . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('tbl_members.national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($memberNo) {
            $query->where('member_no', $memberNo);
        }
        return $query->leftJoin('tbl_member_relations', 'tbl_members.id', '=', 'tbl_member_relations.member_id')
            ->selectRaw('tbl_members.*, count(tbl_member_relations.id) as member_relations_count')
            ->groupBy('tbl_members.id')->orderBy('tbl_members.family', 'ASC')->orderBy('tbl_members.name', 'ASC')->orderBy('tbl_members.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $name, string $family, string $nationalNo, int $identityNo, string $fatherName, string $birthDate, string $membershipDate, int|null $postalCode, int $gender, int $villageId, string|null $tel, string|null $mobile, string|null $address, string|null $description, int $memberNo): mixed
    {
        $this->throwIfNationalNoNotUnique($nationalNo);
        $this->throwIfMemberNoNotUnique($memberNo);
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
            'member_no' => $memberNo,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $family, string $nationalNo, int $identityNo, string $fatherName, string $birthDate, string $membershipDate, int|null $postalCode, int $gender, int $villageId, string|null $tel, string|null $mobile, string|null $address, string|null $description, int $memberNo): bool
    {
        $this->throwIfNationalNoNotUnique($nationalNo, $model);
        $this->throwIfMemberNoNotUnique($memberNo, $model);
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
            'member_no' => $memberNo,
        ];

        return $model->update($data);
    }

    public function count(int|null $villageId, string|null $nameFamily, int|null $nationalNo, int|null $memberNo): int
    {
        $query = Model::query();
        if ($villageId) {
            $query->where('village_id', $villageId);
        }
        if ($nameFamily) {
            $query->where(function ($query) use ($nameFamily) {
                $query->where('name', 'LIKE', '%' . $nameFamily . '%')->orWhere('family', 'LIKE', '%' . $nameFamily . '%');
            });
        }
        if ($nationalNo) {
            $query->where(function ($query) use ($nationalNo) {
                $query->where('national_no', 'LIKE', '%' . $nationalNo . '%');
            });
        }
        if ($memberNo) {
            $query->where('member_no', $memberNo);
        }
        return $query->count();
    }

    private function throwIfNationalNoNotUnique(string $nationalNo, mixed $targetModel = null)
    {
        $member = $this->getByNationalNo($nationalNo);
        if (!$member || ($targetModel instanceof Model && $targetModel->id === $member->id)) {
            return;
        }
        throw new Exception(__('member.national_no_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfMemberNoNotUnique(string $memberNo, mixed $targetModel = null)
    {
        $member = $this->getByMemberNo($memberNo);
        if (!$member || ($targetModel instanceof Model && $targetModel->id === $member->id)) {
            return;
        }
        throw new Exception(__('member.member_no_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
