<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\Administrator\BankController;
use App\Http\Controllers\Administrator\CountryController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\MemberController;
use App\Http\Controllers\Administrator\MemberRelationController;
use App\Http\Controllers\Administrator\NotificationController;
use App\Http\Controllers\Administrator\RelationshipController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Administrator\VillageController;
use App\Http\Controllers\User\BankController as UserBankController;
use App\Http\Controllers\User\CountryController as UserCountryController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\ErrorController as UserErrorController;
use App\Http\Controllers\User\MemberController as UserMemberController;
use App\Http\Controllers\User\MemberRelationController as UserMemberRelationController;
use App\Http\Controllers\User\NotificationController as UserNotificationController;
use App\Http\Controllers\User\RelationshipController as UserRelationshipController;
use App\Http\Controllers\User\UserController as UserUserController;
use App\Http\Controllers\User\VillageController as UserVillageController;
use App\Http\Resources\Bank\BankResource;
use App\Http\Resources\Country\CountryResource;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\MemberRelation\MemberRelationResource;
use App\Http\Resources\Notification\NotificationResource;
use App\Http\Resources\Relationship\RelationshipResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\Village\VillageResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Packages\Notification;
use App\Services\BankService;
use App\Services\CountryService;
use App\Services\ErrorService;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use App\Services\NotificationService;
use App\Services\RelationshipService;
use App\Services\UserService;
use App\Services\VillageService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function () {
            return new Helper();
        });

        $this->app->bind('notification', function () {
            return new Notification();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(ErrorController::class, function ($app) {
            return new ErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(UserErrorController::class, function ($app) {
            return new UserErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserDashboardController::class, function ($app) {
            return new UserDashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(UserUserController::class, function ($app) {
            return new UserUserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(VillageController::class, function ($app) {
            return new VillageController(new JsonResponse(VillageResource::class), $app->make(VillageService::class));
        });

        $this->app->bind(UserVillageController::class, function ($app) {
            return new UserVillageController(new JsonResponse(VillageResource::class), $app->make(VillageService::class));
        });

        $this->app->bind(BankController::class, function ($app) {
            return new BankController(new JsonResponse(BankResource::class), $app->make(BankService::class));
        });

        $this->app->bind(UserBankController::class, function ($app) {
            return new UserBankController(new JsonResponse(BankResource::class), $app->make(BankService::class));
        });

        $this->app->bind(RelationshipController::class, function ($app) {
            return new RelationshipController(new JsonResponse(RelationshipResource::class), $app->make(RelationshipService::class));
        });

        $this->app->bind(UserRelationshipController::class, function ($app) {
            return new UserRelationshipController(new JsonResponse(RelationshipResource::class), $app->make(RelationshipService::class));
        });

        $this->app->bind(MemberController::class, function ($app) {
            return new MemberController(new JsonResponse(MemberResource::class), $app->make(MemberService::class));
        });

        $this->app->bind(UserMemberController::class, function ($app) {
            return new UserMemberController(new JsonResponse(MemberResource::class), $app->make(MemberService::class));
        });

        $this->app->bind(MemberRelationController::class, function ($app) {
            return new MemberRelationController(new JsonResponse(MemberRelationResource::class), $app->make(MemberRelationService::class));
        });

        $this->app->bind(UserMemberRelationController::class, function ($app) {
            return new UserMemberRelationController(new JsonResponse(MemberRelationResource::class), $app->make(MemberRelationService::class));
        });

        $this->app->bind(CountryController::class, function ($app) {
            return new CountryController(new JsonResponse(CountryResource::class), $app->make(CountryService::class));
        });

        $this->app->bind(UserCountryController::class, function ($app) {
            return new UserCountryController(new JsonResponse(CountryResource::class), $app->make(CountryService::class));
        });

        $this->app->bind(NotificationController::class, function ($app) {
            return new NotificationController(new JsonResponse(NotificationResource::class), $app->make(NotificationService::class));
        });

        $this->app->bind(UserNotificationController::class, function ($app) {
            return new UserNotificationController(new JsonResponse(NotificationResource::class), $app->make(NotificationService::class));
        });
    }
}
