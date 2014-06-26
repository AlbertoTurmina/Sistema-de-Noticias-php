<?php
$servidor  =  "SEU SERVIDOR";
$basedados  =  "SEU BANCO";
$utilizador  =  "LOGN";
$chavepass  =  "SENHA";

$conn = mysql_connect($servidor, $utilizador, $chavepass);
if (!$conn)
{
die('Erro; ' . mysql_error());
}
?>