<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Constants\ShareAction;
use App\Models\Member;
use App\Models\ShareAction as Model;
use Exception;
use Illuminate\Support\Facades\DB;

class ShareActionService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int|null $memberId, int $page, int $pageItems): mixed
    {
        $query = Model::join('tbl_members', 'tbl_share_actions.member_id', 'tbl_members.id');
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        return $query->select('tbl_share_actions.*')->orderBy('action_date', 'DESC')->orderBy('tbl_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Member $member, string $actionDate, int $actionType, int $count, string|null $description): mixed
    {
        $memberService = new MemberService();
        $actionDate = substr($actionDate, 0, 4) . "/" . substr($actionDate, 4, 2) . "/" . substr($actionDate, 6);
        $data = [
            'action_date' => $actionDate,
            'action_type' => $actionType,
            'count' => $count,
            'member_id' => $member->id,
            'description' => $description ?? '',
        ];
        $totalSharesBefore = $this->totalSharesTillDate($actionDate);
        $totalShares = $actionType === ShareAction::BUY ? $totalSharesBefore + $count : $totalSharesBefore - $count;
        $totalShares += $this->totalSharesAfterDate($actionDate);
        $this->throwIfSharesExceed($totalShares);
        DB::beginTransaction();
        try {
            if (Model::create($data) && $memberService->updateShares($member, $totalShares)) {
                DB::commit();
                return true;
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        DB::rollBack();
        return false;
    }

    public function update(Model $model, string $actionDate, int $actionType, int $count, string|null $description): bool
    {
        $memberService = new MemberService();
        $actionDate = substr($actionDate, 0, 4) . "/" . substr($actionDate, 4, 2) . "/" . substr($actionDate, 6);
        $data = [
            'action_date' => $actionDate,
            'action_type' => $actionType,
            'count' => $count,
            'description' => $description ?? '',
        ];
        $totalSharesBefore = $this->totalSharesTillDate($actionDate, $model->id);
        $totalShares = $actionType === ShareAction::BUY ? $totalSharesBefore + $count : $totalSharesBefore - $count;
        $totalShares += $this->totalSharesAfterDate($actionDate, $model->id);
        $this->throwIfSharesExceed($totalShares);
        DB::beginTransaction();
        try {
            if ($model->update($data) && $memberService->updateShares($model->member, $totalShares)) {
                DB::commit();
                return true;
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        DB::rollBack();
        return false;
    }

    public function count(int|null $memberId): int
    {
        $query = Model::query();
        if ($memberId) {
            $query->where('member_id', $memberId);
        }
        return $query->count();
    }

    private function totalSharesTillDate(string $actionDate, int|null $id = null): int
    {
        $query = Model::where('action_date', '<=', $actionDate);
        if ($id) {
            $query->where('id', '<', $id);
        }
        $result = $query->selectRaw('SUM(CASE WHEN action_type=1 THEN `count` ELSE -1*`count` END) AS shares')->orderBy('action_date', 'ASC')->orderBy('id', 'ASC')->first();
        if ($result) {
            return $result->shares ?? 0;
        }
        return 0;
    }

    private function totalSharesAfterDate(string $actionDate, int|null $id = null): int
    {
        $query = Model::where('action_date', '>=', $actionDate);
        if ($id) {
            $query->where('id', '>', $id);
        }
        $result = $query->selectRaw('SUM(CASE WHEN action_type=1 THEN `count` ELSE -1*`count` END) AS shares')->orderBy('action_date', 'ASC')->orderBy('id', 'ASC')->first();
        if ($result) {
            return $result->shares ?? 0;
        }
        return 0;
    }

    private function throwIfSharesExceed(int $totalShares)
    {
        if ($totalShares < 0) {
            throw new Exception(__('share_action.share_sell_exceeded'), ErrorCode::CUSTOM_ERROR);
        }
        return;
    }
}
