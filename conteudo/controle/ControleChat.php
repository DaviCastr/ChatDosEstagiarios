<?php
class ControleChat{
    public function GravarMensagem($dados){
        $retorno = false;
        try{
            $estagiario = $dados->getEstagiario();
            $mensagensGravadas = file_get_contents("../conteudo/Chat.txt");
            $mensagem = $dados->getMensagem();
            $resultado = "|&N->".$estagiario."|&M->".$mensagem."\n".$mensagensGravadas;
            if($mensagem == "/apagarmensagens"){
                $retorno = true;
                fwrite(fopen("../conteudo/Chat.txt","w"),"");
            }else{
                $retorno = true;
                fwrite(fopen("../conteudo/Chat.txt","w"),$resultado);
            }
        }catch(Exception $e){
            $arquivo = fopen("console.log","w");
            fwrite($arquivo, $e->getMessage());
        }
        return $retorno;
    }
    public function InserirImagem($dados){
        $retorno = false;
        try{
            foreach($dados->getFoto() as $arquivo){
                $nome = $arquivo["name"];
                $imagem = $arquivo["tmp_name"];
                $tamanho = $arquivo["size"];
                $erro = $arquivo["error"];
                $tipoimg = $arquivo["type"];
                $extensao = strtolower(pathinfo($nome,PATHINFO_EXTENSION));
                #strtolower coloca a extenção em minusculo
                $permitidos="jpg;jpeg;png;gif;ico";
                if(strstr($permitidos,$extensao) AND $tamanho<=2097152){
                    if(move_uploaded_file($imagem, "../fotos/".$nome)){
                        $mensagensGravadas = file_get_contents("../conteudo/Chat.txt");
                        $estagiario = $dados->getEstagiario();
                        $resultado = "|&N->".$estagiario."|&M-><img src=\"fotos/$nome\" class=\"w3-round\" onclick=\"AmpliarImagem(this)\" />"."\n".$mensagensGravadas;
                        if(fwrite(fopen("../conteudo/Chat.txt","w"),$resultado)){
                            $retorno = true;
                        }
                    }
                }
            }            
        }catch(Exception $e){
            $arquivo = fopen("console.log","w");
            fwrite($arquivo, $e->getMessage());
        }
        return $retorno;
    }
    public function Entrar($dados){
        $retorno = false;
        try{
            $estagiario	 = $dados->getEstagiario();
            $mensagensGravadas = file_get_contents("../conteudo/Chat.txt");
            $resultado = "|&N->".$estagiario."|&M-> Entrou no Chat"."\n".$mensagensGravadas;
            if(fwrite(fopen("../conteudo/Chat.txt","w"),$resultado)){
                $retorno = true;
            }    
        }catch(Exception $e){
            $arquivo = fopen("console.log","w");
            fwrite($arquivo, $e->getMessage());
        }
        return $retorno;
    }
    public function Sair($dados){
        $retorno = false;
        try{
            $estagiario	 = $dados->getEstagiario();
            $mensagensGravadas = file_get_contents("../conteudo/Chat.txt");
            $resultado = "|&N->".$estagiario."|&M-> Saiu do Chat"."\n".$mensagensGravadas;
            if(fwrite(fopen("../conteudo/Chat.txt","w"),$resultado)){
                $retorno = true;
            }    
        }catch(Exception $e){
            $arquivo = fopen("console.log","w");
            fwrite($arquivo, $e->getMessage());
        }
        return $retorno;
    }
    // public function VisualizaOnline($dados){
    //     $retorno = false;
    //     try{
    //         $estagiario = $dados->getEstagiario();
    //         date_default_timezone_set("America/Fortaleza");
    //         $usuarios = explode('|',file_get_contents("../conteudo/Online.txt"));
    //         if($usuarios != null){
    //             foreach ($usuarios as $user){
    //                 $nomedata = explode(',',$user);
    //                 if($nomedata[0] != $estagiario){
    //                     if($nomedata[1] == date("Y-m-d", time())){
    //                         $hora = date("h", time());
    //                         $minuto = date("i", time());
    //                         $segundo =  date("s", time());
    //                         $total = $hora.$minuto.$segundo;
    //                         $result =  $total - $nomedata[2];
    //                         if($result < 10 ){
    //                             echo $nomedata[0];
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }catch(Exception $e){
    //         $arquivo = fopen("console.log","w");
    //         fwrite($arquivo, $e->getMessage());
    //     }
    //     return $retorno;
    // }
    public function AtualizaOnline($dados){
        $resultado = false;
        try{
            $estagiario = $dados->getEstagiario();
            $arquivo = fopen("../conteudo/Online.txt", "a");
            date_default_timezone_set("America/Fortaleza");
            $UsuariosAtivos = file_get_contents("../conteudo/Online.txt");
            $usuarios = explode('|',file_get_contents("../conteudo/Online.txt"));
            $Adicionar = 1;
            $data = date("Y-m-d", time());
            $hora = date("h", time());
            $minuto = date("i", time());
            $segundo =  date("s", time());
            $total = $hora.$minuto.$segundo;
            if($usuarios != null){
                foreach ($usuarios as $user){
                    $nomedata = explode(',',$user);
                    if($nomedata[0] == $estagiario){
                        echo $nomedata[0];
                        $NovoOnline = str_replace($nomedata[0].",".$nomedata[1].",".$nomedata[2],$nomedata[0].",".$data.",".$total,$UsuariosAtivos); 
                        $Adicionar = 0;
                    }
                }
            }
            if($Adicionar == 1){
                $AdicionarNovo = "|".$estagiario.",".$data.",".$total;
                fwrite($arquivo,$AdicionarNovo);
                fclose($arquivo);
                $resultado = true;
            }else{
                fwrite(fopen("../conteudo/Online.txt", "w"),$NovoOnline);
                $resultado = true;
            }
        }catch(Exception $e){
            $arquivo = fopen("console.log","w");
            fwrite($arquivo, $e->getMessage());
        }
        return $resultado;
    }
}
?>