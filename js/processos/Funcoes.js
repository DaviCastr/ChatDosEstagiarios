// Envio de mensagens no chat
function EnviarMensagem(FormularioEnv, Container) { //recebem o formlário com argumento
    let Mod = new Modelo();

    let newMessage;
    let Mensagem = FormularioEnv.Mensagem.value;
    let Enviar = FormularioEnv.Enviar;
    Mod.setFormulario(FormularioEnv);
    Mod.setMensagem(Mensagem);
    Mod.setEnviar(Enviar);
    Mod.setChat(Container);
    if (FormularioEnv.Mensagem.value.length > 0) {
        if (Control.EnviarMensagem(Mod)) {
            FormularioEnv.Mensagem.value = "";
            newMessage =
                '<div class="w3-col s12 m12 l12 w3-animate-right" data-estagiario="right">' +
                '<div class="w3-col s12 l10 m10 w3-right usuario MensagemEstagiario">' +
                '<img src="img/perfil.png" class="perfil" />' +
                '<cite>' + 'Você' + '</cite>' + ': ' + Mensagem +
                '</div>' +
                '</div>';

            Container.innerHTML = Container.innerHTML.replace("w3-animate-left", "").replace("w3-animate-right", "") + newMessage;
        }
    }
}
// Envio  de fotos non formulário
function EnviarFoto(Formulario, bProg, Retorno, Porcento, Container, view) {
    if (document.getElementById("errfot")) {
        Retorno.innerHTML = "<div id='errfot' class='w3-center w3-text-red'>Selecione uma Imagem</div>";
    } else {
        let Mod = new Modelo();

        Mod.setFormulario(Formulario);
        Mod.setBarra(bProg);
        Mod.setFoto(Formulario.fotos);
        Mod.setPorcento(Porcento);
        Mod.setBtnEnviar(Formulario.enviar);
        Mod.setContainer(Retorno);
        Mod.setChat(Container);
        Mod.setView(view);
        Control.EnviarFoto(Mod);
        setTimeout(function () {
            if (document.getElementById("errfot")) {
                Retorno.innerHTML = "<div id='errfot' class='w3-center w3-text-red'>Selecione uma foto!</div>";
            }
        }, 1000);
    }
}
//Fazer Login
//Container = onde está o chat nome o elemento onde será escrito o nome input é o elemento que vai receber o valor com nome da pessoa,
//e inputmessage onde vai a mensagem da pessoa 
function FazerLogin(Formulario, Container, Nome, Input, InputMob, InputMessage, InputMessageMob) {
    let expRegNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let NomeEstagiario = Formulario.EstagiarioLogin;
    let Mod = new Modelo();
    Mod.setChat(Container);
    Mod.setEstagiario(NomeEstagiario.value);
    Mod.setFormulario(Formulario);
    Mod.setNome(Nome);
    Mod.setMensagem(InputMessage);
    Mod.setMensagemMob(InputMessageMob);
    Mod.setInputEstagiarioMob(InputMob);
    Mod.setInputEstagiario(Input);
    if (NomeEstagiario.value.length > 2 && NomeEstagiario.value.length <= 11 && expRegNombre.exec(NomeEstagiario.value)) {
        if (Control.Login(Mod)) {
            Control.AtualizarOnline();
            IniciarAtualizarOn();
            IniciarVerificarOn();
            setTimeout(() => {
                NMensagens = 0;
                FazerVerificacao(Container);
                IntervaloChat = setInterval(() => {
                    FazerVerificacao(Container);
                }, 3000);
            }, 1000);
        }
    } else {
        EstagiarioL.value = "Nome Incorreto";
        EstagiarioL.style.color = 'red';
        setTimeout(() => {
            EstagiarioL.value = "";
            EstagiarioL.style.color = "black";
        }, 1000);
    }
}
//Fazer Logout
function FazerLogout(Container, Formulario, FormularioMob, Login) {
    let Mod = new Modelo();
    Mod.setFormulario(Formulario);
    Mod.setFormularioMob(FormularioMob);
    Mod.setChat(Container);

    Control.Sair(Mod, Login);
    clearInterval(IntervaloChat);
    clearInterval(IntervaloAtu);
    clearInterval(IntervaloOn);
    Container.innerHTML = '<div class="w3-center" style="margin-top:20%">' +
        '<img class="w3-image w3-round" src="img/chat.jpg" />' +
        '<h2 class="w3-center w3-text-blue">Faça Login</h2>' +
        '</div>';
}
//muda preview da foto
function MudaPreview(Retorno, Foto, view) {
    Retorno.innerHTML = "";
    let Mod = new Modelo();

    Mod.setRetorno(Retorno);
    Mod.setFoto(Foto);
    Mod.setView(view);
    Control.View(Mod);
}
//Verifica Sessão 
function VerificaSessao(Container, Nome, Formulario, FormularioMob, Login, Input, InputMob) {
    if (sessionStorage.getItem("Estagiario")) {

        Formulario.style.display = "block";
        FormularioMob.style.display = "block";
        Nome.innerText = sessionStorage.getItem("Estagiario");
        Input.value = sessionStorage.getItem("Estagiario");
        InputMob.value = sessionStorage.getItem("Estagiario");
        Login.style.display = "none";
        Control.AtualizarOnline();
        IniciarAtualizarOn();
        IniciarVerificarOn();
        FazerVerificacao(Container);
        IntervaloChat = setInterval(() => {
            FazerVerificacao(Container);
        }, 3000);
        // Control.AtualizarOnline();
        // setTimeout(() => {
        //     Control.VerificarOnline();
        // }, 1000);
        // IniciarAtualizarOn();
        // setTimeout(() => {
        //     IniciarVerificarOn();
        // }, 1000);
    } else {
        // EFeito de digitação
        var animar = document.querySelector("#Digitar");
        animar.classList.add("anima");
        clearInterval(IntervaloChat);
        clearInterval(IniciarAtualizarOn);
        clearInterval(IniciarVerificarOn);
        setTimeout(() => {
            Control.Digitar(animar);
        }, 2000);
        Formulario.style.display = "none";
        Login.style.display = "block";
        FormularioMob.style.display = "none";
    }
}
//Verifica a Permissão de notificações no Navegador
function VerificaPermissao() {
    if (!Notification) {
        //se não
        alert("Seu navegador Não possui acesso a notificações");
        return false;
    } else if (Notification.permission !== "granted") {
        IsNotify = true;
        Notification.requestPermission();
    }else{
        IsNotify = true;
    }
}
//Função de ampliar imagem
function AmpliarImagem(img) {
    document.getElementById("ImgMudarM").src = img.src;
    document.getElementById("VerImagemAmp").style.display = "block";
    document.getElementById("caption").innerHTML = img.alt;
}
//Atualiza o tempo online da pessoa
function IniciarAtualizarOn() {

    IntervaloAtu = setInterval(() => {
        Control.AtualizarOnline();
        if (sessionStorage.getItem("Sair")) {
            clearInterval(IntervaloAtu);
        }
    }, 3000);
}
//Verifica quem está online
function IniciarVerificarOn() {
    IntervaloOn = setInterval(() => {
        Control.VerificarOnline();
        if (sessionStorage.getItem("Sair")) {
            clearInterval(IntervaloOn);
        }
    }, 5000);
}
//Função para verificar qual tecla o usuário está digitando caso seja enter ele envia o fomulário
function ValidarTecla(e,fomr, Container) {
    if (Control.ValidarTecla(e)) {
        EnviarMensagem(fomr, Container);
    }
}
//Vericação de Aba Abertas
function VerificaAba(event) {
    if (event.newValue <= contagem) { // Se o antigo dono ainda estiver por aí
        alert("Já existe uma aba aberta desse mesmo site");
        document.body.innerHTML = "";
        document.write("feche essa aba");
    } else { // Senão
        localStorage.setItem("contagem", contagem + 1); // torna-se o novo dono
    }
}
//Verifica Mensagens novas
function FazerVerificacao(Container) {

    VerificarArquivo("conteudo/Chat.txt", "|&N->");
    setTimeout(() => {
        if (NMensagensNovas.length > NMensagens) {
            if (NMensagens == 0) {
                Container.innerHTML = "";
                NMensagens = NMensagensNovas.length;
                for (var i = 1; i < NMensagensNovas.length; i++) {
                    let DadoMessage = NMensagensNovas[i].split("|&M->");
                    let Name = DadoMessage[0];
                    let Message = DadoMessage[1];
                    let newMessage;
                    if (Name == sessionStorage.getItem("Estagiario")) {
                        newMessage =
                            '<div class="w3-col s12 m12 l12" data-estagiario="right">' +
                            '<div class="w3-col s12 l10 m10 usuario w3-right MensagemEstagiario">' +
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
                    Container.innerHTML += newMessage;
                }
                Container.scrollTop = Container.scrollHeight;
            } else if (NMensagens < NMensagensNovas.length && NMensagens != 0) {
                let Mod = new Modelo();
                Mod.setNova(NMensagensNovas.length);
                Mod.setAnterior(NMensagens);
                Mod.setChat(Container);
                Control.ExibirNovaMensagem(Mod);
                setTimeout(() => {
                    NMensagens = NMensagensNovas.length;
                }, 1000);
            }
        } else {
            NMensagens = NMensagensNovas.length;
        }
    }, 1000);
}
//Verifica se a notificação vai aparecer para o usuário ou não
function MudaNotificacao() {
    if (Notify) {
        Notify = false;
    } else {
        Notify = true;
    }
}