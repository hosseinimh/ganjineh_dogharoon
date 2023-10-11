<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrintShareAction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_print_share_actions';
    protected $fillable = [
        'owner_id',
        'is_member',
        'user_id',
    ];
}
