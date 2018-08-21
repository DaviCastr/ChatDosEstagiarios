<?php
if(isset($_POST['EstagiarioLogin'])){
    require_once("../modelo/Chat.php");
    require_once("../controle/ControleChat.php");
    $Mod = new Chat();
    $Control = new ControleChat();
    $Mod->setEstagiario($_POST['EstagiarioLogin']);
    if($Control->Entrar($Mod)){
        echo "Entrando...";
    }
}
?>