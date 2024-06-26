<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\BankController;
use App\Http\Controllers\User\CountryController;
use App\Http\Controllers\User\ErrorController;
use App\Http\Controllers\User\MemberController;
use App\Http\Controllers\User\MemberRelationController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\PrintShareActionController;
use App\Http\Controllers\User\RelationshipController;
use App\Http\Controllers\User\SettingsController;
use App\Http\Controllers\User\ShareActionController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\VillageController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);

    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/change_password', [UserController::class, 'changePassword']);
});

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users/request_token', [UserController::class, 'requestToken']);

    Route::post('settings/show', [SettingsController::class, 'show']);

    Route::post('villages', [VillageController::class, 'index']);
    Route::post('villages/all', [VillageController::class, 'showAll']);
    Route::post('villages/show/{model}', [VillageController::class, 'show']);

    Route::post('banks', [BankController::class, 'index']);
    Route::post('banks/all', [BankController::class, 'showAll']);
    Route::post('banks/show/{model}', [BankController::class, 'show']);

    Route::post('relationships', [RelationshipController::class, 'index']);
    Route::post('relationships/all', [RelationshipController::class, 'showAll']);
    Route::post('relationships/show/{model}', [RelationshipController::class, 'show']);

    Route::post('countries', [CountryController::class, 'index']);
    Route::post('countries/show/{model}', [CountryController::class, 'show']);

    Route::post('members', [MemberController::class, 'index']);
    Route::post('members/show/{model}', [MemberController::class, 'show']);
    Route::post('members/show_w_villages/{model}', [MemberController::class, 'showWithVillages']);
    Route::post('members/show_w_relationships/{model}', [MemberController::class, 'showWithRelationships']);

    Route::post('member_relations', [MemberRelationController::class, 'all']);
    Route::post('member_relations/{member}', [MemberRelationController::class, 'index']);
    Route::post('member_relations/show/{model}', [MemberRelationController::class, 'show']);
    Route::post('member_relations/show_w_relationships/{model}', [MemberRelationController::class, 'showWithRelationships']);
    Route::post('member_relations/show_w_villages/{model}', [MemberRelationController::class, 'showWithVillages']);

    Route::post('notifications', [NotificationController::class, 'index']);
    Route::post('notifications/review', [NotificationController::class, 'review']);
    Route::post('notifications/seen/{model}', [NotificationController::class, 'seen']);
    Route::post('notifications/seen_review', [NotificationController::class, 'seenReview']);

    Route::post('share_actions/show/{model}', [ShareActionController::class, 'show']);
    Route::post('share_actions/{ownerId}/{isMember}', [ShareActionController::class, 'index']);

    Route::post('print_share_actions/{ownerId}/{isMember}', [PrintShareActionController::class, 'index']);
});
