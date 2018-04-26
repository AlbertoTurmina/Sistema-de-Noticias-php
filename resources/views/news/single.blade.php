@extends('layouts.index')

@section('title')
{{-- 	<h4 class="text-center text-secondary">{{$news->titulo}}</h4> --}}
@endsection

@section('content')
<style type="text/css">
	.jumbotron {
    padding: 1rem 2rem;
}
</style>
	<div class="jumbotron">
	  <h1 class="display-5 text-center">{{$news->titulo}}</h1>
	  <p class="lead text-center">{{$news->resumo}}</p>
	  <hr class="my-4">
	  <p class="text-center">Fonte: {{$news->fonte}}</p>
	</div>
	<img class="img-fluid rounded" src="/uploads/{{$news->img}}" alt="">
	<br>
	<br>
	<div class="content">
		{{$news->texto}}
	</div>
	<br>
	<br>
	<a href="{{route('news.index')}}" class="btn btn-primary btn-block">Voltar</a>
@endsection
