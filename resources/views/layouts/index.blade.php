<!DOCTYPE html>
<html>
<head>
	<title>Sistema de Notícias</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
  @yield('css')
</head>
<body>
<br>
<div class="container">
	<div class="row">
	<div class="col-md-3"></div>
<div class="col-md-6">
    <ul class="nav" style="    transform: rotate(-90deg);
    position: absolute;
    margin-top: 170px;
    left: -170px;">
  <li class="nav-item">
    <a class="nav-link" href="{{ route('news.new') }}">Criar nova</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" href="{{ route('news.index') }}">Notícias</a>
  </li>
</ul>
<br>
@yield('title')
@yield('content')
</div>
<div class="col-md-3"></div>
</div>
</div>	
</body>
</html>
