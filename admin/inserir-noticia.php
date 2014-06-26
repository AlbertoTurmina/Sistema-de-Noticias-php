<?php
ob_start();
include('../conn/conn.php');

$data	=	$_POST['data'];
$titulo	=	$_POST['titulo'];
$fonte	=	$_POST['fonte'];
$resumo	=	$_POST['resumo'];
$texto	=	$_POST['texto'];
$imgs	=	$_FILES['imgs'];
$trimimg=	str_replace(" ", "", strtolower($_FILES["imgs"]["name"]));

if ((($_FILES["imgs"]["type"] == "image/pjpeg") || ($_FILES["imgs"]["type"] == "image/jpeg") || ($_FILES["imgs"]["type"] == "image/gif") || ($_FILES["imgs"]["type"] == "image/png")) && ($_FILES["imgs"]["size"] < 120000)) {

mysql_select_db($basedados, $conn);
mysql_query("INSERT INTO noticias (n_data, n_titulo, n_fonte, n_resumo, n_texto, n_img )
VALUES ('$data', '$titulo', '$fonte', '$resumo', '$texto', '$trimimg' )");

mysql_close($conn);



move_uploaded_file($_FILES["imgs"]["tmp_name"], "img/" . $trimimg);

header("Location: index.php?accao=noticia");
exit();
}
else
  {
  echo "<b>Erro: tipo de arquivo n&atilde;o permitido.</b>";
  }
?>