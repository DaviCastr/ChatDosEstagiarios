<?php 
if(isset($_POST['Mensagem']) AND isset($_POST['Estagiario'])){
   foreach ( $_POST as $chave => $valor ) {
    //  Remove todas as tags HTML
    //  Remove os espaços em branco do valor
        $$chave = trim( strip_tags( $valor ) );
   }
    require_once("../modelo/Chat.php");
    require_once("../controle/ControleChat.php");
    $Mod = new Chat();
    $Control = new ControleChat();
    $Mod->setEstagiario($_POST['Estagiario']);
    $Mod->setMensagem($_POST['Mensagem']);
    if($Control->GravarMensagem($Mod)){
        echo "Gravando...";
    }
}else{
    header("Location: ../");
}
?>