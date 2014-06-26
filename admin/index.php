
	<?php if (!(isset($_GET['accao']))) {$_GET['accao'] = "NULL";} if ($_GET['accao'] != 'noticia') { ?>
        <div class="grid_6">
		<h1>Inserir notícia</h1>
<form name="inserir" id="inserir" method="post" action="inserir-noticia.php"  enctype="multipart/form-data" >
<input name="data" type="hidden" id="data" value="<?php echo date('Y-m-d') ?>" />
<h4>Titulo:</h4><br />
<input name="titulo" type="text" id="titulo" size="40" /><br />
<h4>Fonte:</h4><br />
<input name="fonte" type="text" id="fonte" size="40" /><br />
<h4>Texto:</h4><br />
<textarea name="texto" id="texto" cols="45" rows="5"></textarea><br />
<h4>Resumo:</h4><br />
<textarea name="resumo" id="resumo" cols="45" rows="5"></textarea><br />
<h4>Imagem até 120KB, Tamanho 300x300:</h4><br />
  <input name="imgs" type="file" id="imgs" size="45" />
<br />
<input type="submit" name="button" id="button" value="Salvar" />
</form>
    </div>
	
    <?php } ?>
	



