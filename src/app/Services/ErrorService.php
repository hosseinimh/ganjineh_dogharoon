<?php

namespace App\Services;

use App\Models\Error as Model;

class ErrorService
{
    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $message): mixed
    {
        $data = [
            'message' => $message,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function count(): int
    {
        return Model::count();
    }
}
