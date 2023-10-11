<?php

namespace App\Services;

use App\Models\PrintShareAction as Model;

class PrintShareActionService
{
    public function getPaginate(int $ownerId, int $isMember, int $page, int $pageItems): mixed
    {
        if ($isMember) {
            return Model::join('tbl_members', 'tbl_print_share_actions.owner_id', '=', 'tbl_members.id')->join('tbl_users', 'tbl_print_share_actions.user_id', 'tbl_users.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_print_share_actions.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_print_share_actions.created_at', 'DESC')->orderBy('tbl_print_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }
        return Model::join('tbl_member_relations', 'tbl_print_share_actions.owner_id', '=', 'tbl_member_relations.id')->join('tbl_users', 'tbl_print_share_actions.user_id', 'tbl_users.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_print_share_actions.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_print_share_actions.created_at', 'DESC')->orderBy('tbl_print_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function count(int $ownerId, int $isMember): int
    {
        return Model::where('owner_id', $ownerId)->where('is_member', $isMember)->count();
    }
}
