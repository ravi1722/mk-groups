<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {

        $amounts = DB::select("Select id,amount from amountmaster");
        return Inertia::render('Admin/Index', compact("amounts"));
    }
    public function getall(Request $request)
    {
        if ($request->ajax()) {
            $mode = $request->mode;
            $result = [];
            if ($mode == 'getamountbymonth') {
                $month = date('m', strtotime($request->month));
                $year = date('Y', strtotime($request->month));

                $result = DB::select("Select a.id,name,email,mobile,DATE_FORMAT(created_at, '%D %M %Y') created_at,
                modeofpayment,NVL(c.amount,0) amount from users a Left join mop_master b on a.mopid=b.id left Join entrytrans c on a.id=c.userid 
                and month(c.date) = " . $month . " and year(c.date) = " . $year . "");
            }
            if ($mode == 'saveamount') {
                $amount = $request->amount;
                $userid = $request->userid;
                $date = date('Y-m-d', strtotime($request->month));
                $month = date('m', strtotime($request->month));
                $year = date('Y', strtotime($request->month));

                $getdata = DB::select("Select transid from entrytrans where userid=" . $userid . " and month(date) = " . $month . " and year(date) = " . $year . "");
                if (count($getdata) > 0) {
                    $sSql = "Update entrytrans set amount=" . $amount . " where userid=" . $userid . " and month(date) = " . $month . " and year(date) = " . $year . "";
                    DB::update($sSql);
                } else {
                    DB::table('entrytrans')->insert([
                        'amount' => $amount,
                        'userid' => $userid,
                        'date' => $date,
                    ]);
                }
            }
            return response()->json($result, 200);
        }
    }
}
