<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberRelation extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_member_relations';
    protected $fillable = [
        'name',
        'family',
        'national_no',
        'identity_no',
        'birth_date',
        'gender',
        'relationship_id',
        'description',
        'transfer_description',
        'shares',
        'member_no',
        'member_id',
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
