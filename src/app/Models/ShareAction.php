<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShareAction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_share_actions';
    protected $fillable = [
        'action_type',
        'action_date',
        'count',
        'member_id',
        'description',
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
