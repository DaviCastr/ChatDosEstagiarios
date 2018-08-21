<?php
if(isset($_GET['Estagiario'])){
    require_once("../modelo/Chat.php");
    require_once("../controle/ControleChat.php");
    $Mod = new Chat();
    $Control = new ControleChat();
    $Mod->setEstagiario($_GET['Estagiario']);
    if($Control->Sair($Mod)){
        echo "Saindo...";
    }
}
?>