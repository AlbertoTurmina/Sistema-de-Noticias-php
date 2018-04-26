@extends('layouts.index')

@section('css')

@endsection

@section('title')
  <h4 class="text-center text-secondary">Criar nova</h4>
@endsection

@section('content')
        <div class="grid_6">
<form name="inserir" id="inserir" method="post" action="{{route('news.save')}}"  enctype="multipart/form-data" >
  <div class="form-group">
    <label for="titulo">Título</label>
    <input name="titulo" type="text" id="titulo" size="40" class="form-control" placeholder="titulo" />
    <small id="emailHelp" class="form-text text-muted">Uma descrição para a matéria com limite de 40 caracteres.</small>
  </div>
  <div class="form-group">
    <label for="fonte">Fonte</label>
    <input name="fonte" type="text" id="fonte" size="40" class="form-control" placeholder="fonte" />
    <small id="emailHelp" class="form-text text-muted">Uma fonte para a matéria com limite de 40 caracteres.</small>
  </div>
    <div class="form-group">
    <label for="texto">Texto</label>
    <textarea name="texto" id="texto" cols="45" rows="5" class="form-control" placeholder="texto"></textarea>
    <small id="emailHelp" class="form-text text-muted">Texto da matéria com limite de 40 caracteres.</small>
  </div>
    <div class="form-group">
    <label for="resumo">Resumo</label>
    <textarea name="resumo" id="resumo" cols="45" rows="5" class="form-control" placeholder="resumo"></textarea>
    <small id="emailHelp" class="form-text text-muted">Resumo da matéria com limite de 40 caracteres.</small>
  </div>
    <div class="form-group">
    <label for="resumo">Imagem até 120KB, Tamanho 300x300:</label>
    <input name="imgs" type="file" id="imgs" size="45" class="form-control" />
    <small id="emailHelp" class="form-text text-muted">Resumo da matéria com limite de 40 caracteres.</small>
  </div>

<button type="submit" class="btn btn-primary btn-block" id="button">Salvar</button>
<br>
</form>
    </div>
@endsection

