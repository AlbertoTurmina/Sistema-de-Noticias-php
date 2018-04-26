@extends('layouts.index')

@section('title')
	
@endsection

@section('content')
	@if(isset($news))
		@foreach($news as $n)
			<div class="card">
			  <div class="card-header">
			    {{$n->fonte}}
			  </div>
			  <div class="card-body">
			    <h5 class="card-title">{{$n->titulo}}</h5>
			    <p class="card-text">{{$n->resumo}}</p>
			    <a href="{{$n->id}}" class="btn btn-primary btn-block">Visualizar</a>
			    <a href="/news/delete/{{$n->id}}" class="btn btn-danger btn-block">Excluir</a>
			  </div>
			</div>
			<br>
		@endforeach
	@else
	<div class="text-info text-center">Nenhuma notícia encontrada</div>
	@endif
@endsection
