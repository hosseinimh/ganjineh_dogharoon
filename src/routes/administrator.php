<?php

use App\Http\Controllers\Administrator\BankController;
use App\Http\Controllers\Administrator\CountryController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\MemberController;
use App\Http\Controllers\Administrator\MemberRelationController;
use App\Http\Controllers\Administrator\RelationshipController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Administrator\VillageController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

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

    Route::post('members/store', [MemberController::class, 'store']);
    Route::post('members/update/{model}', [MemberController::class, 'update']);

    Route::post('member_relations/store/{member}', [MemberRelationController::class, 'store']);
    Route::post('member_relations/update/{model}', [MemberRelationController::class, 'update']);
});
