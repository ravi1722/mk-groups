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
        $mop = DB::select("Select id,modeofpayment from mop_master");
        return Inertia::render('Admin/Index', compact("amounts", "mop"));
    }
    public function getall(Request $request)
    {
        if ($request->ajax()) {
            $mode = $request->mode;
            $result = [];
            if ($mode == 'getamountbymonth') {
                $month = date('m', strtotime($request->month));
                $year = date('Y', strtotime($request->month));
                $endDate = date('Y-m-d', strtotime($request->month)) . " 00:00:00";
                $eamountid = $request->eamountid;

                $result['bydate'] = DB::select("Select a.id,name,email,mobile,DATE_FORMAT(created_at, '%D %M %Y') created_at,a.mopid,
                modeofpayment,NVL(c.amount,0) amount from users a Left join mop_master b on a.mopid=b.id left Join entrytrans c on a.id=c.userid 
                and c.amountmasterid=" . $eamountid . " and month(c.date) = " . $month . " and year(c.date) = " . $year . " order by a.id");
                $beforedate = DB::select("Select NVL(sum(amount),0) amount from entrytrans where amountmasterid=" . $eamountid . " and date < '" . $endDate . "'");
                $result['nodate'] = $beforedate[0]->amount;
            }
            if ($mode == 'editdata') {
                $editdata = $request->editdata;

                if (count($editdata) > 0) {
                    $userid = $editdata['id'];
                    $name = $editdata['name'];
                    $email = $editdata['email'];
                    $mobile = $editdata['mobile'];
                    $mopid = $editdata['mopid'];
                    $amount = $editdata['amount'];

                    $eamountid = $request->eamountid;
                    $date = date('Y-m-d', strtotime($request->month));
                    $month = date('m', strtotime($request->month));
                    $year = date('Y', strtotime($request->month));

                    $sSql = "Update users set name='" . $name . "',email='" . $email . "',mobile='" . $mobile . "',mopid=" . $mopid . " where id=" . $userid;
                    DB::update($sSql);

                    $getdata = DB::select("Select transid from entrytrans where amountmasterid=" . $eamountid . " and userid=" . $userid . " and month(date) = " . $month . " and year(date) = " . $year . "");
                    if (count($getdata) > 0) {
                        $sSql = "Update entrytrans set amount=" . $amount . " where amountmasterid=" . $eamountid . " and userid=" . $userid . " and month(date) = " . $month . " and year(date) = " . $year . "";
                        DB::update($sSql);
                    } else {
                        DB::table('entrytrans')->insert([
                            'amount' => $amount,
                            'userid' => $userid,
                            'amountmasterid' => $eamountid,
                            'date' => $date,
                        ]);
                    }
                }
            }
            if ($mode == 'addnewtab') {
                $newamount = $request->newamount;

                DB::table('amountmaster')->insert([
                    'amount' => $newamount,
                ]);
            }
            return response()->json($result, 200);
        }
    }
}
