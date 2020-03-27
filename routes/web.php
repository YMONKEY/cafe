<?php

/*
|--------------------------------------------------------------------------
| web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::any('/', function () {
//    echo phpinfo();
//    echo csrf_token();
//    //return view('welcome');
//});

Route::get('/cafe/{id}', 'API\CafesController@getCafe');

Route::get('/geocode', function () {
    return \App\Utilities\GaodeMaps::geocodeAddress('天城路1号', '杭州', '浙江');
});

Route::get('/test', "TestController@test");

Route::middleware("throttle:8,1")->group(function() {
   Route::any('/usr',function() {
        return "throttle";
   });
});


Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
Route::get('/', 'HomeController@index')->name('home');

Route::get('admin/login', 'Admin\LoginController@showLoginForm')->name('admin.login');
Route::post('admin/login', 'Admin\LoginController@login');
Route::get('admin/register', 'Admin\RegisterController@showRegistrationForm')->name('admin.register');
Route::post('admin/register', 'Admin\RegisterController@register');
Route::post('admin/logout', 'Admin\LoginController@logout')->name('admin.logout');
Route::get('admin', 'AdminController@index')->name('admin.home');


Route::get('/login','Web\AppController@getLogin')->name('login')->middleware('guest');

Route::get( '/auth/{social}', 'Web\AuthenticationController@getSocialRedirect' )
    ->middleware('guest');

Route::get( '/auth/{social}/callback', 'Web\AuthenticationController@getSocialCallback' )
    ->middleware('guest');