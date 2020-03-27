<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use Illuminate\Foundation\Auth\RedirectsUsers;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected $redirectTo = '/admin';

    public function __construct()
    {
        $this->middleware('guest:admin');
    }

    public function showRegistrationForm()
    {
        return view('admin.register');
    }

    protected function guard()
    {
        return Auth::guard('admin');
    }

    protected  function validator(array $data)
    {
        return Validator::make($data,[
            'name' => 'required|string|max:225',
            'email' => 'required|string|email|max:225|unique:admins',
            'password' => 'required|string|min:6|confirmed'
        ]);
    }

    protected function create(array $data)
    {
        print_r($data);
        return Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
