<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Constants\ShareActionType;
use App\Models\Bank;
use App\Models\Member;
use App\Models\MemberRelation;
use App\Models\ShareAction as Model;
use Exception;
use Illuminate\Support\Facades\DB;

class ShareActionService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $ownerId, int $isMember, int $page, int $pageItems): mixed
    {
        if ($isMember) {
            return Model::join('tbl_members', 'tbl_share_actions.owner_id', '=', 'tbl_members.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_share_actions.*', 'tbl_members.shares')->orderBy('action_date', 'DESC')->orderBy('tbl_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }
        return Model::join('tbl_member_relations', 'tbl_share_actions.owner_id', '=', 'tbl_member_relations.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_share_actions.*', 'tbl_member_relations.shares')->orderBy('action_date', 'DESC')->orderBy('tbl_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Member|MemberRelation $owner, int $isMember, string $actionDate, int $actionType, string|null $transactionDate, Bank|null $bank, string|null $invoiceNo, int $price, string|null $description): mixed
    {
        $memberService = new MemberService();
        $memberRelationService = new MemberRelationService();
        $actionDate = substr($actionDate, 0, 4) . "/" . substr($actionDate, 4, 2) . "/" . substr($actionDate, 6);
        $transactionDate = $transactionDate ? substr($transactionDate, 0, 4) . "/" . substr($transactionDate, 4, 2) . "/" . substr($transactionDate, 6) : null;
        $bankId = $bank ? $bank->id : null;
        $data = [
            'action_date' => $actionDate,
            'action_type' => $actionType,
            'transaction_date' => $transactionDate,
            'bank_id' => $bankId,
            'invoice_no' => $invoiceNo,
            'price' => $price,
            'owner_id' => $owner->id,
            'is_member' => $isMember,
            'description' => $description ?? '',
        ];
        $totalSharesBefore = $this->totalSharesTillDate($owner->id, $isMember, $actionDate);
        $totalShares = $actionType === ShareActionType::BUY ? $totalSharesBefore + 1 : $totalSharesBefore - 1;
        $totalShares += $this->totalSharesAfterDate($owner->id, $isMember, $actionDate);
        $this->throwIfSharesExceedOrAlreadyAssigned($actionType, $totalShares);
        DB::beginTransaction();
        try {
            $inserted = Model::create($data);
            $updated = $isMember ? $memberService->updateShares($owner, $totalShares) : $memberRelationService->updateShares($owner, $totalShares);
            if ($inserted && $updated) {
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
        // $memberService = new MemberService();
        // $actionDate = substr($actionDate, 0, 4) . "/" . substr($actionDate, 4, 2) . "/" . substr($actionDate, 6);
        // $data = [
        //     'action_date' => $actionDate,
        //     'action_type' => $actionType,
        //     'count' => $count,
        //     'description' => $description ?? '',
        // ];
        // $totalSharesBefore = $this->totalSharesTillDate($actionDate, $model->id);
        // $totalShares = $actionType === ShareAction::BUY ? $totalSharesBefore + $count : $totalSharesBefore - $count;
        // $totalShares += $this->totalSharesAfterDate($actionDate, $model->id);
        // $this->throwIfSharesExceed($totalShares);
        // DB::beginTransaction();
        // try {
        //     if ($model->update($data) && $memberService->updateShares($model->member, $totalShares)) {
        //         DB::commit();
        //         return true;
        //     }
        // } catch (Exception $e) {
        //     DB::rollBack();
        //     throw $e;
        // }
        // DB::rollBack();
        return false;
    }

    public function count(int $ownerId, int $isMember): int
    {
        return Model::where('owner_id', $ownerId)->where('is_member', $isMember)->count();
    }

    private function totalSharesTillDate(int $ownerId, int $isMember, string $actionDate, int|null $id = null): int
    {
        $query = Model::where('owner_id', $ownerId)->where('is_member', $isMember)->where('action_date', '<=', $actionDate);
        if ($id) {
            $query->where('id', '<', $id);
        }
        $result = $query->selectRaw('SUM(CASE WHEN action_type=1 THEN 1 ELSE -1 END) AS shares')->orderBy('action_date', 'ASC')->orderBy('id', 'ASC')->first();
        if ($result) {
            return $result->shares ?? 0;
        }
        return 0;
    }

    private function totalSharesAfterDate(int $ownerId, int $isMember, string $actionDate, int|null $id = null): int
    {
        $query = Model::where('owner_id', $ownerId)->where('is_member', $isMember)->where('action_date', '>', $actionDate);
        if ($id) {
            $query->where('id', '>', $id);
        }
        $result = $query->selectRaw('SUM(CASE WHEN action_type=1 THEN 1 ELSE -1 END) AS shares')->orderBy('action_date', 'ASC')->orderBy('id', 'ASC')->first();
        if ($result) {
            return $result->shares ?? 0;
        }
        return 0;
    }

    private function throwIfSharesExceedOrAlreadyAssigned(int $actionType, int $totalShares)
    {
        if (($actionType === ShareActionType::SELL || $actionType === ShareActionType::REFUND) && $totalShares !== 0) {
            throw new Exception(__('share_action.share_exceeded'), ErrorCode::CUSTOM_ERROR);
        } else if ($actionType === ShareActionType::BUY && $totalShares !== 1) {
            throw new Exception(__('share_action.share_already_assigned'), ErrorCode::CUSTOM_ERROR);
        }
        return;
    }
}
