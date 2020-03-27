<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function test(Request $request){
        $this->validate($request,['a'=>'string']);
        echo htmlspecialchars($request->input("a"));

        echo "|";//echo strip_tags($request->input("a"));
        echo htmlentities($request->input("a"));
        echo $request->input("a");
    }
}
