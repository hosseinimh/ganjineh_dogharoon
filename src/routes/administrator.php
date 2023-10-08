<?php

use App\Http\Controllers\Administrator\BankController;
use App\Http\Controllers\Administrator\CountryController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\MemberController;
use App\Http\Controllers\Administrator\MemberRelationController;
use App\Http\Controllers\Administrator\RelationshipController;
use App\Http\Controllers\Administrator\ShareActionController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Administrator\VillageController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('errors', [ErrorController::class, 'index']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('villages/store', [VillageController::class, 'store']);
    Route::post('villages/update/{model}', [VillageController::class, 'update']);

    Route::post('banks/store', [BankController::class, 'store']);
    Route::post('banks/update/{model}', [BankController::class, 'update']);

    Route::post('relationships/store', [RelationshipController::class, 'store']);
    Route::post('relationships/update/{model}', [RelationshipController::class, 'update']);

    Route::post('countries/store', [CountryController::class, 'store']);
    Route::post('countries/update/{model}', [CountryController::class, 'update']);

    Route::post('members/store/{village}', [MemberController::class, 'store']);
    Route::post('members/update/{model}/{village}', [MemberController::class, 'update']);
    Route::post('members/transfer_member_relation_to_member/{relationModel}/{village}', [MemberController::class, 'transferMemberRelationToMember']);
    Route::post('members/delete/{model}', [MemberController::class, 'delete']);

    Route::post('member_relations/store/{member}/{relationship}', [MemberRelationController::class, 'store']);
    Route::post('member_relations/update/{model}/{relationship}', [MemberRelationController::class, 'update']);
    Route::post('member_relations/transfer_member_to_member_relation/{member}/{parentMember}/{relationship}', [MemberRelationController::class, 'transferMemberToMemberRelation']);
    Route::post('member_relations/transfer_member_relation_to_new_member/{model}/{member}', [MemberRelationController::class, 'transferMemberRelationToNewMember']);
    Route::post('member_relations/delete/{model}', [MemberRelationController::class, 'delete']);

    Route::post('share_actions/add/props/{ownerId}/{isMember}', [ShareActionController::class, 'getAddProps']);
    Route::post('share_actions/store/{ownerId}/{isMember}', [ShareActionController::class, 'store']);
    Route::post('share_actions/update/{model}', [ShareActionController::class, 'update']);
    Route::post('share_actions/delete/{model}', [ShareActionController::class, 'delete']);
});
