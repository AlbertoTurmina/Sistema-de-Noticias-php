<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades;
use App\News;

class NewsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        $news = News::all();

        return view('news.index', compact('news'));
    }

    public function new()
    {
        return view('news.new');
    }

    public function single($id)
    {
        $news = News::find($id);

        return view('news.single', compact('news'));
    }

    public function delete($id)
    {
        $news = News::find($id);
       
        $news->delete();

        return redirect()->route('news.index');
    }

    public function save(Request $request)
    {
        $data = $request->all();

        $imageName = $request->file('imgs')->getClientOriginalName();

        $request->file('imgs')->move(
            base_path() . '/public/uploads/', $imageName
        );

        $data['img'] = $imageName = $request->file('imgs')->getClientOriginalName();

        $news = News::create($data);

        return redirect()->route('news.index');
    }
}
