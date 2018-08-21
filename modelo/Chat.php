<?php
class Chat{
    private $estagiario;
    private $mensagem;
    private $foto;
    private $data;
    Private $hora;
    
    public function getEstagiario(){
        return $this->estagiario;
    }
    public function setEstagiario($editestagiario){
        $this->estagiario = $editestagiario;
    }
    public function getData(){
        return $this->data;
    }
    public function setData($editdata){
        $this->data = $editdata;
    }
    public function getHora(){
        return $this->hora;
    }
    public function setHora($edithora){
        $this->hora = $edithora;
    }
    public function getMensagem(){
        return $this->mensagem;
    }
    public function setMensagem($editmensagem){
        $this->mensagem = $editmensagem;
    }
    public function getFoto(){
        return $this->foto;
    }
    public function setFoto($editfoto){
        $this->foto = $editfoto;
    }
}
?>