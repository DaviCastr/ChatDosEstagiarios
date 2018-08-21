<?php

if(isset($_GET['Estagiario'])) {
    require_once("../modelo/Chat.php");
    require_once("../controle/ControleChat.php");
    $Mod = new Chat();
    $Control = new ControleChat();
    $Mod->setEstagiario($_GET['Estagiario']);
    $Mod->setFoto($_FILES);
    if(!$Control->InserirImagem($Mod)){
        echo "<span id='errfot'></span>";
    }
}else{
    header("Location: ../");
}
?>