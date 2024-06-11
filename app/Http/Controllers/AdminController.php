<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index(){
        $users = DB::select("Select id,name,email,mobile,DATE_FORMAT(created_at, '%D %M %Y') created_at From users");
        return Inertia::render('Admin/Index',compact("users"));
    }
}
