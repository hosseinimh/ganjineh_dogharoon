<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_members';
    protected $fillable = [
        'name',
        'family',
        'national_no',
        'identity_no',
        'father_name',
        'birth_date',
        'membership_date',
        'postal_code',
        'gender',
        'village_id',
        'tel',
        'mobile',
        'address',
        'description',
        'member_no',
        'card_no',
    ];

    public function memberRelations()
    {
        return $this->hasMany(MemberRelation::class);
    }
}
