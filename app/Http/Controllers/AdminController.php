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
                $endDate = date('Y-m-01', strtotime($request->month)) . " 00:00:00";
                $eamountid = $request->eamountid;

                $result['bydate'] = DB::select("Select a.id,name,email,mobile,isadmin,DATE_FORMAT(startmonth, '%M %Y') created_at,
                NVL(c.mopid,0) mopid,modeofpayment,NVL(c.amount,0) amount,b.transid amounttransid from users a Left Join amounttrans b on a.id=b.userid Left join 
                entrytrans c on b.transid=c.amounttransid and  month(c.date) = " . $month . " and year(c.date) = " . $year . "
                Left join mop_master d on c.mopid=d.id where amountid =" . $eamountid. " Order by name");

                $beforedate = DB::select("Select NVL(sum(amount),0) amount from amounttrans a Left Join entrytrans b on a.transid=b.amounttransid where amountid=" . $eamountid . " and date < '" . $endDate . "'");
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
                    $amounttransid = $editdata['amounttransid'];

                    $eamountid = $request->eamountid;
                    $date = date('Y-m-01', strtotime($request->month));
                    $month = date('m', strtotime($request->month));
                    $year = date('Y', strtotime($request->month));

                    $sSql = "Update users set name='" . $name . "',email='" . $email . "',mobile='" . $mobile . "' where id=" . $userid;
                    DB::update($sSql);

                    $getdata = DB::select("Select transid from entrytrans where amounttransid=" . $amounttransid . " and month(date) = " . $month . " and year(date) = " . $year . "");
                    if (count($getdata) > 0) {
                        $sSql = "Update entrytrans set amount=" . $amount . ",mopid=" . $mopid . " where amounttransid=" . $amounttransid . " and month(date) = " . $month . " and year(date) = " . $year . "";
                        DB::update($sSql);
                    } else {
                        DB::table('entrytrans')->insert([
                            'amount' => $amount,
                            'mopid' => $mopid,
                            'amounttransid' => $amounttransid,
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
            if ($mode == 'adduser') {
                $ename = $request->ename;
                $eemail = $request->eemail;
                $emobile = $request->emobile;
                // $emop = $request->emop;
                $ecettu = $request->ecettu;
                $endDate = date('Y-m-d', strtotime($request->month)) . " 00:00:00";

                $id = DB::table('users')->insertGetId([
                    'name' => $ename,
                    'mobile' => $emobile,
                    'email' => $eemail,
                    'startmonth' => $endDate,
                    'created_at' => date('Y-m-d H:i:s'),
                    'password' => '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q',
                ]);

                DB::table('amounttrans')->insert([
                    'userid' => $id,
                    'amountid' => $ecettu,
                ]);
            }
            if ($mode == 'deleteuser') {
                $id = $request->id;
                $gettrans = DB::select("Select transid From amounttrans where userid=".$id);
                if(count($gettrans) > 0){
                    foreach($gettrans as $trans){
                        DB::table('entrytrans')->where('amounttransid', $trans->transid)->delete();
                    }
                }
                DB::table('amounttrans')->where('userid', $id)->delete();
                DB::table('users')->where('id', $id)->delete();
            }
            return response()->json($result, 200);
        }
    }
}
