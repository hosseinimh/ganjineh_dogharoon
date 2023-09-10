<?php

use App\Http\Controllers\User\MemberController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('users/logout', [UserController::class, 'logout']);

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(
    function () {
        Route::get('members/print', [MemberController::class, 'print']);
    }
);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
