<?php

namespace App\Http\Controllers;

use App\Models\categoryModel;
use App\Models\news;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {


        $category = categoryModel::all();

        return view('layouts.pages.home', compact('category'));
    }
    public function list()
    {
        $category = categoryModel::all();
        $news = news::all();
        $ticket = Ticket::all();
        return view('layouts.pages.List', compact('category', 'news', 'ticket'));
    }
    public function timve(Request $request)
    {
        $addressstart = $request->addressstart;
        $addressend = $request->addressend;
        $timestart = $request->timestart;
        $category = categoryModel::all();
        // $news = news::all();
        $news = news::where('addressstart', '=', $addressstart)->where('addressend', '=', $addressend)->where('timestart', 'like', '%' . $timestart . '%')->get();
        $ticket = Ticket::all();
        return view('layouts.pages.timkiem', compact('category', 'news', 'ticket'));
    }
    public function book($id_news, Request $request)
    {
        $book = new Book();
        $book->id_location = $request->location;
        $book->id_new = $id_news;
        $book->id_user = $request->id_user;
        $book->name = $request->name;
        $book->id_nhaxe = $request->id_nhaxe;
        $book->phone = $request->phone;
        $book->count = $request->count;
        $book->email = $request->email;
        $book->content = $request->content;
        $book->save();
        $k =  $request->location;
        $arrr = explode(',', $k);
        foreach ($arrr as $key => $value) {
            $ticket = Ticket::find($value);
            if ($ticket) {
                $ticket->status = 1;
                $ticket->id_user = $request->id_user;
                $ticket->save();
            }
        }
        return redirect()->route('pay')->with('success', 'Thêm thành công.');
    }
    public function listticket($id)
    {
        $user = User::find($id);
        //status = 1 là mới đặt, 2 đã chấp nhận, 3 đã xé vé
        $newbooks = Ticket::where('status', 1)->where('id_user', $id)->get();
        $booksactive = Ticket::where('status', 2)->where('id_user', $id)->get();
        $booksaold = Ticket::where('status', 3)->where('id_user', $id)->get();
        $news = news::all();
        $ticket = Ticket::all();
        $category = categoryModel::all();
        return view('layouts.pages.user.list', compact('newbooks', 'booksactive', 'booksaold', 'category', 'news', 'ticket'));
    }
    public function listticket1($id)
    {
        $user = User::find($id);
        //status = 1 là mới đặt, 2 đã chấp nhận, 3 đã xé vé
        $newbooks = Ticket::where('status', 1)->where('id_user', $id)->get();
        $booksactive = Ticket::where('status', 2)->where('id_user', $id)->get();
        $booksaold = Ticket::where('status', 3)->where('id_user', $id)->get();
        $news = news::all();
        $ticket = Ticket::all();
        $category = categoryModel::all();
        return view('layouts.pages.user.list1', compact('newbooks', 'booksactive', 'booksaold', 'category', 'news', 'ticket'));
    }
    public function deleteticket($id)
    {
        $ticket = Ticket::find($id);
        $ticket->status = 0;
        $ticket->id_user = 0;
        $ticket->save();
        return redirect()->route('statusticket', ['id' => Auth::user()->id]);
    }
    public function addcus()
    {
        $user = User::all();
        return view('admin.user.addcustomer', compact('user'));
    }
    public function addoct()
    {
        $user = User::all();
        return view('admin.user.addoct', compact('user'));
    }
    public function addoct1()
    {
        $user = User::all();
        return view('admin.user.addoct1', compact('user'));
    }
    public function tk()
    {
        $user = User::all();
        return view('admin.user.tk', compact('user'));
    }
    public function noti()
    {
        $user = User::all();
        return view('admin.user.noti', compact('user'));
    }
    public function pay()
    {
        $user = User::all();
        return view('layouts.pages.user.payment', compact('user'));
    }
    public function succ()
    {
        $user = User::all();
        return view('layouts.pages.user.sucess', compact('user'));
    }
}
