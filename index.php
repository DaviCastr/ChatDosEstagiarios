<?php
# <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/icon.css">
echo
<<<TAG
<!DOCTYPE html>
<html>
    <head>
        <title>Chat Dos Estagiários</title>
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="img/icone.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="css/framework.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/icon.css">
        <link rel="stylesheet" href="css/style.css" />
        <script src="js/processos/ajax.js"></script>
    </head>
<body>
  <section id="ConteudoChat">
    <div id="VerImagemAmp" class="w3-modal w3-black" onclick="this.style.display='none'">
      <span class="w3-button w3-large w3-black w3-text-white w3-display-topright" title="Close Modal Image"><i class="fa fa-remove"></i></span>
      <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
        <img id="ImgMudarM" style="width:90%;max-width:600px;min-height:310px;max-height:500px;" class="w3-image w3-round">
        <p id="caption" class="w3-opacity w3-large"></p>
      </div>
    </div>
  	<div id="InserirFoto" class="w3-modal">
  		<div class="w3-modal-content w3-animate-zoom w3-card-4 w3-round" style="max-width: 350px;margin-top:5%;">
  			<header class="w3-container w3-center w3-padding-32 w3-blue"> 
  				<span onclick="document.getElementById('InserirFoto').style.display='none'" class="w3-btn w3-text-white w3-xlarge w3-display-topright w3-blue">×</span>
  				<h3 class="w3-center w3-text-white">Inserir Foto</h3>
  			</header>
  			<div class="w3-container">
  				<div class="w3-light-grey w3-padding">
  					<div class="w3-center">
  						<div class="w3-row">
  							<div class="w3-col s12">
  								<div  class="w3-center w3-col s12 m12 l12 w3-margin-bottom">
  									<img src="img/FotoMais.jpg" width='200' id="View" height='200' >
  									<progress id="barradeProgresso" class="w3-margin-top" style="display:none;margin-left:auto;margin-right:auto;"></progress><span style="display: none;" id="ProgressoPCT"></span>
                  </div>
                  <div id="enviaFoto"></div>
                  <form action="##" method="post" name="FormFotos">
                      <div class="w3-col s12 m12 l12">
                        <label for="fotos" style="background-color: #d77600;" class="w3-btn w3-round w3-text-white">Foto <i class="fa fa-image"></i></label>
                        <input style='display:none' id="fotos" type="file" name="fotos[]" multiple>
                      </div>
                    <div class="w3-col s12 m12 l12">
  										<button type="submit"  class="w3-blue w3-margin-top w3-block w3-btn w3-text-white w3-round" name='enviar'>Enviar <i class="fa fa-arrow-right"></i></button>
  									</div>
  								</form>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
    <div style="padding-bottom: 9px" class="w3-row w3-container w3-card-4 ">
        <h1 class="w3-center w3-round w3-blue" id="Digitar">Chat Gfx Consultoria Estagiários(as)</h1>
        <div class="w3-col s12 m4 l4">
          <fieldset class="w3-margin-top">
              <form id="Login" name="Login" style="display:none" class="w3-container" action="/action_page.php">
                  <div id="Processar"></div>
                  <div class="w3-row">
                      <div class="w3-col s12 m12 l12 w3-center">
                          <img src="img/perfil.png" class="perfilLogin" />
                      </div>
                      <div class="w3-col s12 m12 l12">
                        <label class="w3-text-blue"><b>Estagiário(a)</b></label>
                        <input class="w3-input w3-border" id="EstagiarioLogin" placeholder="Seu Nome Estágiário(a)" name="EstagiarioLogin" type="text">
                      </div>
                      <div class="w3-col s12 m12 l12 w3-center">
                        <button type="submit" name="Enviar" class="w3-round w3-btn w3-blue w3-margin-top w3-center">Login</button>
                      </div>
                </div>
              </form>
              <div class="w3-col s12 m12 l12 w3-center" style='display:none' id="Carregar" >
                <img src="img/preloader6.gif"  class="perfilLogin" />
              </div>
              <div id="Principal">
                <form id="Formulario" name="Formulario" style="display:none" class="w3-container" action="/action_page.php">
                    <div class="w3-col s6 m8 l7">
                        <button type="button" class="w3-left w3-btn w3-round w3-blue" id="Sair">Sair</button>
                    </div>
                    <div class="w3-col s6 m5 l4 tooltip w3-round w3-right-align">
                      <button type="button" class="w3-margin-left w3-btn w3-round w3-blue"><img src="img/verdebotao.png" id="VisualizarOnlines"  />Online</button>
                      <span id="PessoasOn" class="tooltiptext">Últimos 2min</span>
                    </div>
                    <div class="w3-row">
                      <div class="w3-col s12 m12 l12 w3-hide-sma w3-center">
                          <img src="img/perfil.png" class="perfilEstagiario" />
                      </div>
                      <h3 id="NomeEstagiario" class="w3-center"></h3>
                      <div class="w3-col s12 m12 l12">
                        <input class="w3-input w3-border" id="Estagiario" name="Estagiario" type="hidden">
                      </div>
                      <div class="w3-col s12 m12 l12 w3-hide-small">
                        <label class="w3-text-blue"><b>Mensagem</b></label>
                        <textarea class="w3-input w3-border" id="Mensagem" name="Mensagem"></textarea>
                        <center style="margin-top: 4px;">
                          <a class='w3-btn w3-blue w3-round' id='InserirLink'>
                              <i class="ui paperclip icon"></i>
                          </a>
                          <a class='w3-btn w3-hide-medium  w3-blue w3-round' id='InserirNegrito'>
                              <i class="ui bold icon"></i>
                          </a>
                          <a class='w3-btn w3-blue w3-round' id='InserirImagem'>
                              <i class="ui image icon"></i>
                          </a>
                        </center>  
                        <div class="w3-col s12 m12 l12 w3-center">
                          <button type="submit" name="Enviar" class="w3-round w3-btn w3-blue w3-margin-top w3-center">Enviar</button>
                        </div>
                      </div>
                  </div>
                </form>
              </div>
          </fieldset>
        </div>
        <div id="PrincipalMobile" class="w3-border w3-col s12 m8 l8 w3-margin-top">
          <div class="Chat" id="Chat">
          <div class="w3-center" style="margin-top:20%">
            <img class="w3-image w3-round" src="img/chat.jpg" />
            <h2 class="w3-center w3-text-blue">Faça Login</h2>
          </div>
          </div>
            <div id="PrincipalMobile" class="w3-hide-large w3-hide-medium">
              <hr />
              <form id="FormularioMobile" name="FormularioMobile" style="display:none" class="w3-container w3-hide-large w3-hide-medium w3-margin-bottom" action="#">
                <div class="w3-col s12 m12 l12">
                  <input class="w3-input w3-border" id="EstagiarioMobile" name="Estagiario" type="hidden">
                </div>  
                <div class="w3-col s7 m12 l12 w3-hide-large w3-hide-medium">
                  <textarea class="w3-input w3-border w3-round textarea-mobile" id="MensagemMobile" name="Mensagem"></textarea>
                </div>
                <div class="w3-col s2">
                  <center>
                    <button type="button" class='w3-btn w3-blue w3-large w3-round' style="margin-top:15%;margin-left:5px;" id='InserirImagemMobile'>
                        <i class="ui image icon"></i>
                    </button>
                  </center>  
                </div>
                <div class="w3-col s2 w3-hide-large w3-hide-medium">
                  <div class="w3-col s12 m12 l12 w3-center" style="margin-top:15%;margin-left:19px;">
                    <button type="submit" name="Enviar" class="w3-round w3-btn w3-large w3-blue w3-center">></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </section>
</body>
<script src="js/processos/Variaveis.js"></script>
<script src="js/modelo/Modelo.js"></script>
<script src="js/controle/Controle.js"></script>
<script src="js/processos/Funcoes.js"></script>
<script src="js/processos/Processo.js"></script>
</html>
TAG;
?>