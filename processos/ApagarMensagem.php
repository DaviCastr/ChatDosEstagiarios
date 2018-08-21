<?php
 if(isset($_POST['Mensagem'])){
     if($_POST['Mensagem'] == "/executaradmin" AND $_POST['Estagiario'] == "Admin"){
        $mensagens = file_get_contents("../conteudo/Chat.html");
        $resultado = str_replace($_GET['Mensagem'],"",$mensagens);
        $arquivo = fopen("../conteudo/Chat.html","w");
        fwrite($arquivo, $resultado);
        fclose($arquivo);
     }
 }
?>