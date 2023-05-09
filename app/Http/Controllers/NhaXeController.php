<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\news;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use App\Models\User;
class NhaXeController extends Controller
{


    public function list()
    {
        $news = news::all();
        return view('layouts.pages.nhaxe.list', compact('news'));
    }
    public function add()
    {
        return view('layouts.pages.nhaxe.add');
    }
    public function store(Request $request)
    {


            $new = new news();

            $new->id_user = Auth::user()->id;
            $new->name = $request->name;
            $new->text = $request->text;
            $new->timestart =$request->timestart;

            $new->timeend = $request->timeend;
            $new->addressstart = $request->addressstart;

            $new->addressend = $request->addressend;
            $new->price = $request->price;
            $new->save();
            for ($i=1; $i <= 6; $i++) {
                $ticket = new Ticket;
                $ticket->id_nhaxe = Auth::user()->id;
                $ticket->id_news = $new->id;
                $ticket->status = 0;
                $ticket->id_user = 0;
                $ticket->location = $i;
                $ticket->save();
            }
        return redirect()->route('add')->with('success', 'Thêm thành công.');
    }
    public function edit ($id)
    {
        $news = news::find($id);
        return view('layouts.pages.nhaxe.edit', compact('news'));
    }
    public function update(Request $request, $id)
    {



        $news  =  news::find($id);
        $news->name = $request['name'];
        $news->text = $request['text'];
        $news->timestart = $request['timestart'];
        $news->timeend = $request['timeend'];
        $news->addressstart = $request['addressstart'];
        $news->price = $request['price'];
        $news->addressend = $request['addressend'];

        $news->save();
        return redirect()->back()->with('massage', 'Cập Nhập Thành Công');
    }
    public function delete($id)
    {
        news::find($id)->delete();
        return redirect()->back()->with('status', 'Xóa Thành Công');
    }
    public function listnew(){
        $news = news::where('id_user', Auth::user()->id)->get();
        return view('layouts.pages.nhaxe.list', compact('news'));
    }
    
    public function statusticket($id){
        $ticket =Ticket::where('id_nhaxe',  Auth::user()->id)->where('id_news', $id)->get();
        $news = news::where('id_user', Auth::user()->id)->get();
        $user = User::all();
        return view('layouts.pages.nhaxe.statusticket', compact(['ticket','news','user']));
    }
    public function activeTicket($id){
        $ticket = Ticket::find($id);
        $ticket->status = 2;
        $ticket->save();
        return back();
    }

}
