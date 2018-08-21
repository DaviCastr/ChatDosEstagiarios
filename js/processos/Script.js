//Formulario Do Estagiario
try {
    //verificar se existe mais de uma página aberta desse site
    var contagem = +localStorage.getItem("contagem"); // Antigo dono
    var Formulario = document.Formulario;
    var Mensagem = Formulario.Mensagem;
    var Estagiario = Formulario.Estagiario;
    var Enviar = Formulario.Enviar;
    var Login = document.forms.Login;
    var EstagiarioL = Login.EstagiarioLogin;
    var Sair = document.querySelector("#Sair");
    var Nome = document.querySelector("#NomeEstagiario");
    var Chat = document.querySelector("#Chat");
    var InserirLink = document.getElementById("InserirLink");
    var Negrito = document.getElementById("InserirNegrito");
    var InserirImg = document.getElementById("InserirImagem");
    var BtnInserirFoto = document.getElementById("Inserir");
    var FormularioFotos = document.forms.FormFotos;
    var foto = FormularioFotos.fotos;
    var EnviarFot = FormularioFotos.enviar;
    var Retorno = document.getElementById("enviarComentario");
    var bProg = document.getElementById("barradeProgresso");
    var viw = document.getElementById("View");
    var IsNotify = false;
    var Intervalo = 0;
    var NMensagens = 0;
    var NMensagensNovas = 0;
    var PessoasOnline = 0;
    var IntervaloOn = 0;
    var IntervaloAtu = 0;
    var ContPessoasOn = document.querySelector("#PessoasOn");
    window.addEventListener("storage", storageChanged, false);
    localStorage.setItem("contagem", contagem + 1); // Tenta se tornar o novo dono

    function storageChanged(event) {
        if (event.newValue <= contagem) { // Se o antigo dono ainda estiver por aí
            alert("Já existe uma aba aberta desse mesmo site");
            document.body.innerHTML = "";
            document.write("feche essa aba");
        } else { // Senão
            localStorage.setItem("contagem", contagem + 1); // torna-se o novo dono
        }
    }
    if (Chat) {
        function FazerVerificacao() {
            VerificarArquivo("conteudo/Chat.txt", "|&N->");
            setTimeout(() => {
                if (NMensagensNovas.length > NMensagens) {
                    if (NMensagens == 0) {
                        NMensagens = NMensagensNovas.length;
                        for (var i = NMensagensNovas.length - 1; i > 0; i--) {
                            let DadoMessage = NMensagensNovas[i].split("|&M->");
                            let Name = DadoMessage[0];
                            let Message = DadoMessage[1];
                            let newMessage;
                            if (Name == sessionStorage.getItem("Estagiario")) {
                                newMessage =
                                    '<div class="w3-col s12 m12 l12" data-estagiario="rigth">' +
                                    '<div class="w3-col s12 l10 m10 w3-right MensagemEstagiario">' +
                                    '<img src="img/perfil.png" class="perfil" />' +
                                    '<cite>' + "Você" + '</cite>' + ': ' + Message +
                                    '</div>' +
                                    '</div>';
                            } else {
                                newMessage =
                                    '<div class="w3-col s12 m12 l12" data-estagiario="left">' +
                                    '<div class="w3-col s12 l10 m10 MensagemEstagiario">' +
                                    '<img src="img/perfil.png" class="perfil" />' +
                                    '<cite>' + Name + '</cite>' + ': ' + Message +
                                    '</div>' +
                                    '</div>';
                            }
                            Chat.innerHTML = newMessage + Chat.innerHTML;
                        }
                    } else if (NMensagens < NMensagensNovas.length && NMensagens != 0) {
                        Control.ExibirMensagens();
                        NMensagens = NMensagensNovas.length;
                    }
                } else {
                    NMensagens = NMensagensNovas.length;
                }
                FazerVerificacao();
            }, 1000);
        };
        FazerVerificacao();
    }
    InserirLink.addEventListener('click', () => {
        Mensagem.value += "<a href=' ' target='blank' > Link</a>";
    });
    EstagiarioL.setAttribute('maxlength', '11');
    InserirImg.addEventListener('click', () => {
        document.querySelector("#InserirFoto").style.display = "block";
    });
    Negrito.addEventListener('click', () => {
        Mensagem.value += "<b> </b>";
    });
    Mensagem.addEventListener('keypress', (e) => {
        if (Control.ValidarTecla(e) && Mensagem.value.length > 1) {
            Mod.setEnviar(Enviar);
            Mod.setEstagiario(Estagiario.value);
            Mod.setMensagem(Mensagem.value);
            Control.EnviarMensagem();
        }
    });
    //Verificação de permissão para notificações
    document.addEventListener('DOMContentLoaded', function () {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });

    function IniciarVerificarOn() {
        IntervaloOn = setInterval(() => {
            Control.VerificarOnline();
            if (sessionStorage.getItem("Sair")) {
                clearInterval(IntervaloOn);
            }
        }, 5000);
    }

    function IniciarAtualizarOn() {
        IntervaloAtu = setInterval(() => {
            if (sessionStorage.getItem("Sair")) {
                clearInterval(IntervaloAtu);
            } else {
                Control.AtualizarOnline();
            }
        }, 3000);
    }

    function AmpliarImagem(img) {
        document.getElementById("ImgMudarM").src = img.src;
        document.getElementById("VerImagemAmp").style.display = "block";
        document.getElementById("caption").innerHTML = img.alt;
    }
    // Função para exibir as notificações se existe
    function NofiticacaoGoogleChrome() {
        if (!Notification) {
            //se não
            alert("Seu navegador Não possui acesso a notificações");
            return false;
        }
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        } else {
            function Notificacao(ConteudoDaNotificacao) {
                var notification = new Notification('Chat GFX Estagiários', {
                    icon: 'img/icone.png',
                    body: "Você tem novas mensagens->" + ConteudoDaNotificacao,
                });
                notification.addEventListener('click', () => {
                    window.open("https://davi.ntectreinamentos.com.br/chat/");
                });
            }
        }

    }
    if (sessionStorage.getItem("Estagiario")) {
        Formulario.style.display = "block";
        Nome.innerText = sessionStorage.getItem("Estagiario");
        Estagiario.value = sessionStorage.getItem("Estagiario");
        Login.style.display = "none";
        Control.AtualizarOnline();
        setTimeout(() => {
            Control.VerificarOnline();
        }, 1000);
        IniciarAtualizarOn();
        setTimeout(() => {
            IniciarVerificarOn();
        }, 1000);
    } else {
        // EFeito de digitação
        var animar = document.querySelector("#Digitar");
        animar.classList.add("anima");
        setTimeout(() => {
            Control.Digitar(animar);
        }, 2000);
        Formulario.style.display = "none";
        Login.style.display = "block";
    }
    Login.addEventListener('submit', (e) => {
        e.preventDefault();
        let expRegNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (EstagiarioL.value.length > 1 && EstagiarioL.value.length <= 11 && expRegNombre.exec(EstagiarioL.value)) {
            Control.Login();
            Chat.innerHTML = "";
            NMensagens = 0;
            Control.AtualizarOnline();
            setTimeout(() => {
                Control.VerificarOnline();
            }, 1000);
            IniciarAtualizarOn();
            setTimeout(() => {
                IniciarVerificarOn();
            }, 1000);
        } else {
            EstagiarioL.value = "Nome Incorreto";
            EstagiarioL.style.color = 'red';
            setTimeout(() => {
                EstagiarioL.value = "";
                EstagiarioL.style.color = "black";
            }, 1000);
        }
    });
    Sair.addEventListener("click", (e) => {
        Control.Sair();
        Chat.innerHTML = "";
        NMensagens = 0;
        IniciarVerificarOn();
        IniciarAtualizarOn();
    });
    Formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        Mod.setFormulario(Formulario);
        Mod.setEstagiario(Estagiario.value);
        Mod.setMensagem(Mensagem.value);
        Mod.setEnviar(Enviar);
        if (Mensagem.value.length > 0) {
            Control.EnviarMensagem();
        }
    });
    foto.onchange = function () {
        Retorno.innerHTML = "";
        Mod.setFoto(foto);
        Control.View();
    }
    FormularioFotos.onsubmit = function (e) {
        e.preventDefault();
        foto.onchange();
        if (document.getElementById("errfot")) {
            Retorno.innerHTML = "<div id='errfot' class='w3-center w3-text-red'>Selecione uma Imagem</div>";
        } else {
            Mod.setBarra(bProg);
            Mod.setFoto(foto);
            Mod.setBtnEnviar(EnviarFot);
            Mod.setContainer(Retorno);
            Control.EnviarFoto();
            setTimeout(function () {
                if (document.getElementById("errfot")) {
                    Retorno.innerHTML = "<div id='errfot' class='w3-center w3-text-red'>Selecione uma foto!</div>";
                }
            }, 1000);
        }
    };
    document.body.onmouseover = function (e) {
        if (IsNotify) {
            IsNotify = false;
        }
    }
    document.body.onmouseout = function (e) {
        if (!IsNotify) {
            IsNotify = true;
        }
    }
} catch (err) {
    console.log(err.message);

    // window.location.href = "../chat";
}