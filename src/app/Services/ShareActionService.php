<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Constants\ShareActionType;
use App\Facades\Helper;
use App\Models\Member;
use App\Models\MemberRelation;
use App\Models\PrintShareAction;
use App\Models\ShareAction as Model;
use Exception;
use Illuminate\Support\Facades\DB;

class ShareActionService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getLast(int $ownerId, int $isMember): mixed
    {
        return Model::where('owner_id', $ownerId)->where('is_member', $isMember)->orderBy('action_date', 'DESC')->orderBy('id', 'DESC')->first();
    }

    public function getPaginate(int $ownerId, int $isMember, int $page, int $pageItems): mixed
    {
        if ($isMember) {
            return Model::join('tbl_members', 'tbl_share_actions.owner_id', '=', 'tbl_members.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_share_actions.*', 'tbl_members.shares')->orderBy('action_date', 'DESC')->orderBy('tbl_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }
        return Model::join('tbl_member_relations', 'tbl_share_actions.owner_id', '=', 'tbl_member_relations.id')->where('owner_id', $ownerId)->where('is_member', $isMember)->select('tbl_share_actions.*', 'tbl_member_relations.shares')->orderBy('action_date', 'DESC')->orderBy('tbl_share_actions.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Member|MemberRelation $owner, int $isMember, string $actionDate, int $actionType, string|null $transactionDate, int|null $bankId, string|null $invoiceNo, int $price, string|null $description): mixed
    {
        $actionDate = substr($actionDate, 0, 4) . "/" . substr($actionDate, 4, 2) . "/" . substr($actionDate, 6);
        $this->throwIfNotLastDate($actionDate, $owner->id, $isMember);
        $totalShares = $this->totalShares($owner->id, $isMember);
        $totalShares += $actionType === ShareActionType::BUY ? 1 : -1;
        $this->throwIfSharesExceedOrAlreadyAssigned($actionType, $totalShares);
        $memberService = new MemberService();
        $memberRelationService = new MemberRelationService();
        $transactionDate = $transactionDate ? substr($transactionDate, 0, 4) . "/" . substr($transactionDate, 4, 2) . "/" . substr($transactionDate, 6) : null;
        $data = [
            'action_date' => $actionDate,
            'action_type' => $actionType,
            'transaction_date' => $transactionDate,
            'bank_id' => $transactionDate ? $bankId : null,
            'invoice_no' => $transactionDate ? $invoiceNo : null,
            'price' => $transactionDate ? $price : 0,
            'owner_id' => $owner->id,
            'is_member' => $isMember,
            'description' => $description ?? '',
        ];
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

    public function update(Model $model, string|null $transactionDate, int|null $bankId, string|null $invoiceNo, int $price, string|null $description): mixed
    {
        $transactionDate = $transactionDate ? substr($transactionDate, 0, 4) . "/" . substr($transactionDate, 4, 2) . "/" . substr($transactionDate, 6) : null;
        if ($transactionDate && $transactionDate < $model['action_date']) {
            throw new Exception(str_replace(':field', $model['action_date'], __('share_action.share_not_same_date')), ErrorCode::CUSTOM_ERROR);
        }
        $data = [
            'transaction_date' => $transactionDate,
            'bank_id' => $transactionDate ? $bankId : null,
            'invoice_no' => $transactionDate ? $invoiceNo : null,
            'price' => $transactionDate ? $price : 0,
            'description' => $description ?? '',
        ];
        return $model->update($data);
    }

    public function updateOwner(int $oldOwnerId, int $oldIsMember, int $ownerId, int $isMember): mixed
    {
        $data = [
            'owner_id' => $ownerId,
            'is_member' => $isMember,
        ];
        return Model::where('owner_id', $oldOwnerId)->where('is_member', $oldIsMember)->update($data);
    }

    public function delete(Model $model): bool
    {
        $this->throwIfNotLast($model, $model->owner_id, $model->is_member);
        $memberService = new MemberService();
        $memberRelationService = new MemberRelationService();
        DB::beginTransaction();
        try {
            $deleted = $model->delete();
            $totalShares = $this->totalShares($model->owner_id, $model->is_member);
            $owner = $model->is_member ? $memberService->get($model->owner_id) : $memberRelationService->get($model->owner_id);
            $updated = $model->is_member ? $memberService->updateShares($owner, $totalShares) : $memberRelationService->updateShares($owner, $totalShares);
            if ($deleted && $updated) {
                DB::commit();
                return true;
            }
        } catch (Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            throw $e;
        }
        DB::rollBack();
        return false;
    }

    public function count(int $ownerId, int $isMember): int
    {
        return Model::where('owner_id', $ownerId)->where('is_member', $isMember)->count();
    }

    public function onShareActionPrinted(int $ownerId, int $isMember): void
    {
        try {
            $data = [
                'owner_id' => $ownerId,
                'is_member' => $isMember,
                'user_id' => auth()->user()->id,
            ];
            PrintShareAction::create($data);
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }

    private function totalShares(int $ownerId, int $isMember): int
    {
        $query = Model::where('owner_id', $ownerId)->where('is_member', $isMember);
        $result = $query->selectRaw('SUM(CASE WHEN action_type=1 THEN 1 ELSE -1 END) AS shares')->orderBy('action_date', 'ASC')->orderBy('id', 'ASC')->first();
        if ($result) {
            return $result->shares ?? 0;
        }
        return 0;
    }

    private function throwIfNotLast(Model $model, int $ownerId, int $isMember)
    {
        $last = $this->getLast($ownerId, $isMember);
        if ($last && intval($last['id']) !== intval($model->id)) {
            throw new Exception(str_replace(':field', $last['action_date'], __('share_action.share_not_last')), ErrorCode::CUSTOM_ERROR);
        }
        return;
    }

    private function throwIfNotLastDate(string $actionDate, int $ownerId, int $isMember)
    {
        $last = $this->getLast($ownerId, $isMember);
        if ($last && $last['action_date'] > $actionDate) {
            throw new Exception(str_replace(':field', $last['action_date'], __('share_action.share_not_last_date')), ErrorCode::CUSTOM_ERROR);
        }
        return;
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
