<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index(){

        $amounts = DB::select("Select id,amount from amountmaster");

        $users = DB::select("Select a.id,name,email,mobile,DATE_FORMAT(created_at, '%D %M %Y') created_at,modeofpayment,0 amount
        From users a Left join mop_master b on a.mopid=b.id");
        return Inertia::render('Admin/Index',compact("users","amounts"));
    }
}
