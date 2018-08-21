<?php
try{
    if (isset($_GET['Estagiario']) AND isset($_GET['Data'])){
        require_once("../modelo/Chat.php");
        require_once("../controle/ControleChat.php");
        $Mod = new Chat();
        $Control = new ControleChat();
        $Mod->setEstagiario($_GET['Estagiario']);
        $Mod->setData($_GET['Data']);
        $Mod->setHora($_GET['Hora']);
        if($Control->AtualizaOnline($Mod)){
            echo "Gravando...";
        }
    }
}catch(Exception $e){
    echo $e->getMessage();
}
?>