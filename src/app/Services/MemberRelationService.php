<?php

namespace App\Services;

use App\Models\MemberRelation as Model;

class MemberRelationService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $memberId, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_relationships', 'tbl_member_relations.relationship_id', 'tbl_relationships.id')->where('member_id', $memberId)->select('tbl_member_relations.*', 'tbl_relationships.name AS relationship_name')->orderBy('family', 'ASC')->orderBy('tbl_member_relations.name', 'ASC')->orderBy('tbl_member_relations.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $memberId, string $name, string $family, string $nationalNo, int $identityNo, string $birthDate, int $gender, int $relationshipId, string|null $description): mixed
    {
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

    public function count(int $memberId): mixed
    {
        return Model::where('member_id', $memberId)->count();
    }
}
