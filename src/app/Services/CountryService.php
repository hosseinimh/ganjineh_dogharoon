<?php

namespace App\Services;

use App\Models\Country as Model;

class CountryService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('name', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $name): mixed
    {
        $data = [
            'name' => $name,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name): bool
    {
        $data = [
            'name' => $name,
        ];

        return $model->update($data);
    }

    public function count(): int
    {
        return Model::count();
    }
}
