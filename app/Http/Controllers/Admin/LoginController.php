<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirctTo = '/admin';

    public function __construct()
    {
        $this->middleware('guest:admin',['only'=>'login']);
    }

    public function showLoginForm()
    {
        return view("admin.login");
    }

    public function guard()
    {
        return Auth::guard('admin');
    }


    protected function loggedOut(Request $request)
    {
        return redirect(route('admin.login'));
    }
}
