class Controle {
    View(infor) {
        let viw = infor.getView();
        let Retorno = infor.getRetorno();
        let ImgRead = new FileReader();
        ImgRead.readAsDataURL(infor.getFoto().files[0]);
        ImgRead.onload = function (oFREvent) {
            if (oFREvent.target.result.includes("image/jpg") || oFREvent.target.result.includes("image/png") || oFREvent.target.result.includes("image/jpeg")) {
                viw.src = oFREvent.target.result;
            } else {
                viw.src = "../img/FotoMais.jpg";
                Retorno.innerHTML = "<div id='errfot' class='w3-center w3-text-red'>Selecione uma Imagem jpg,png,jpeg</div>";
            }
        };
    }
    EnviarMensagem(infor) {
        let resultado = false;
        try {
            let Mensagem = infor.getMensagem();
            let Chat = infor.getChat();
            let BtnEnviar = infor.getEnviar();
            let ajax = iniciarAjax(); // Inicia Ajax
            let ValorBtnEnviar = BtnEnviar.innerHTML;
            BtnEnviar.disabled = true;
            BtnEnviar.innerHTML = "<img src='img/preloader3.gif' style='width:35px;height:18px;'/>";
            if (ajax) { // Verifica se Ajax está ativo
                let Dados = new FormData(infor.getFormulario());
                ajax.open("POST", "processos/GravarMensagem.php", true); // Define a requisiçã
                ajax.send(Dados); // Envia requisição
                resultado = true;
                ajax.onload = function () {
                    if (Mensagem == "/apagarmensagens" || Mensagem == "/apagaronlines") {
                        Chat.innerHTML = "";
                    } else {
                        resultado = true;
                    }
                    BtnEnviar.disabled = false;
                    BtnEnviar.innerHTML = ValorBtnEnviar;
                    Chat.scrollTop = Chat.scrollHeight;
                };
            }
        } catch (err) {
            console.log(err);
        }
        return resultado;
    }
    ExibirNovaMensagem(infor) {
        let NumeroMessages = infor.getNova() - infor.getAnterior(); //getNova e getAnterior são o número de mensagens novas e o número anterior de mensagens
        let Chat = infor.getChat();
        let UltimaMessage = infor.getNova() - NumeroMessages;
        for (let i = UltimaMessage; i < infor.getNova(); i++) {
            let DadoMessage = NMensagensNovas[i].split("|&M->");
            let Name = DadoMessage[0];
            let Message = DadoMessage[1];
            let newMessage;
            if (Name != sessionStorage.getItem("Estagiario")) {
                newMessage =
                    '<div class="w3-col s12 m12 l12 w3-animate-left" data-estagiario="left">' +
                    '<div class="w3-col s12 l10 m10 w3-left MensagemEstagiario">' +
                    '<img src="img/perfil.png" class="perfil" />' +
                    '<cite>' + Name + '</cite>' + ': ' + Message +
                    '</div>' +
                    '</div>';

                Chat.innerHTML = Chat.innerHTML.replace("w3-animate-left", "").replace("w3-animate-right", "") + newMessage;
            }
        }
        Chat.scrollTop = Chat.scrollHeight;
        if (IsNotify) {
            if (Notification.permission == "granted" && !sessionStorage.getItem("Sair") && NMensagens > 0 && Notify) {

                let MensagemCite = document.querySelectorAll("div.MensagemEstagiario");
                let cite = document.querySelectorAll("div.MensagemEstagiario cite");
                let numero = cite.length - 1;
                if (cite[numero].innerText != "Você") {
                    let NEst = MensagemCite[numero].innerText;
                    let notification = new Notification('Chat GFX Estagiários->Noificação', {
                        icon: 'img/icone.png',
                        body: NEst,
                    });
                }
            }
        }
    }
    Login(infor) {
        let retorno = false;
        try {
            let Estagiario = infor.getEstagiario();
            let InputNomeMobile = infor.getInputEstagiarioMob()
            let Login = infor.getFormulario();
            let Nome = infor.getNome();
            let InputNome = infor.getInputEstagiario();
            let MensagemMobile = infor.getMensagemMob();
            let Mensagem = infor.getMensagem();
            let Chat = infor.getChat();
            let Dados = new FormData(Login);
            let Carregar = document.getElementById('Carregar');
            let Principal = document.querySelector("#Formulario"); //principal é o container que aparece ao fazer o login
            let PrincipalMobile = document.querySelector("#FormularioMobile");
            let ajax = iniciarAjax(); // Inicia Ajax
            if (ajax) { // Verifica se Ajax está ativo
                Carregar.style.display = "block"
                InputNome.value = Estagiario;
                InputNomeMobile.value = Estagiario;
                sessionStorage.clear();
                sessionStorage.setItem("Estagiario", Estagiario);
                Login.style.display = "none";
                Nome.innerText = Estagiario;
                ajax.open("POST", "processos/Entrar.php", true); // Define a requisiçã
                ajax.send(Dados); // Envia requisição
                Chat.innerHTML = "";
                ajax.onload = function () {
                    setTimeout(() => {
                        Mensagem.value = "";
                        MensagemMobile.value = "";
                        Carregar.style.display = "none";
                        Principal.style.display = "block";
                        PrincipalMobile.style.display = "block";
                    }, 1000);
                };
                retorno = true;
            }
        } catch (err) {
            console.log(err);
        }
        return retorno;
    }
    Sair(infor, Login) {
        let Formulario = infor.getFormulario();
        let FormularioMob = infor.getFormularioMob();
        let Chat = infor.getChat();
        FormularioMob.style.display = "none";
        Formulario.style.display = "none";
        document.getElementById('Carregar').style.display = "block";
        let ajax = iniciarAjax(); // Inicia Ajax
        if (ajax) { // Verifica se Ajax está ativo
            let quem = sessionStorage.getItem("Estagiario");
            ajax.open("GET", "processos/Sair.php?Estagiario=" + quem, true); // Define a requisiçã
            ajax.send(null); // Envia requisição
            sessionStorage.clear();
            sessionStorage.setItem("Sair", quem);
            Chat.innerHTML = "";
            ajax.onload = function () {
                document.getElementById('Carregar').style.display = "none";
                Login.style.display = "block";
            };
        }
    }
    Digitar(elemento) {
        let texto = elemento.innerText.split("");
        elemento.innerHTML = "";
        texto.forEach((letra, i) => {
            setTimeout(() => {
                elemento.innerHTML += letra;
            }, 75 * i);
        });
        setTimeout(() => {
            elemento.classList.remove("anima");
        }, 3000);
    }
    ValidarTecla(e) {
        let resultado = false;
        try {
            if (e.which == 13) {
                resultado = true;
            }
        } catch (err) {
            console.log(err);
        }
        return resultado;
    }
    EnviarFoto(infor) {
        let resultado = false;
        try {
            let barra = infor.getBarra();
            let ExecutarFoto = infor.getContainer();
            let EnviarFot = infor.getBtnEnviar();
            let arquivos = infor.getFoto().files;
            let formData = new FormData();
            let PorCento = infor.getPorcento();
            let Chat = infor.getChat();
            let Foto = infor.getFoto();
            let viw = infor.getView();
            EnviarFot.innerHTML = "Enviando...";
            for (let i = 0; i < arquivos.length; i++) {
                let arquivo = arquivos[i];
                formData.append(i, arquivo, arquivo.name);
            }
            let ajax = iniciarAjax();
            ajax.onreadystatechange = function () { // Evento de mudança de estado
                mostrarResposta(ExecutarFoto, ajax); // Execução da resposta da requisição
            };
            ajax.open("POST", "processos/InserirFoto.php?Estagiario=" + sessionStorage.getItem("Estagiario"));
            ajax.upload.onloadstart = function () {
                PorCento.style.display = "block";
                barra.style.display = "block";
                barra.value = 0;
                PorCento.innerHTML = "0%";
            };
            ajax.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    barra.max = e.total;
                    barra.value = e.loaded;
                    let ratio = Math.floor((e.loaded / e.total) * 100) + '%';
                    PorCento.innerText = ratio;
                    console.log(ratio);
                }
            };
            ajax.upload.onloadend = function (e) {
                barra.value = e.loaded;
                console.clear();
                setTimeout(function () {
                    barra.style.display = "none";
                    PorCento.style.display = "none";
                }, 1000);
            };
            ajax.send(formData);
            ajax.onload = function () {
                if (ajax.status === 200) {
                    EnviarFot.innerHTML = 'Enviar <i class="fa fa-arrow-right"></i>';
                    viw.src = "img/FotoMais.jpg";
                    document.getElementById('InserirFoto').style.display = 'none';
                    for (let i = infor.getFoto().files.length - 1; i => 0; i--) {
                        let ImgRead = new FileReader();
                        ImgRead.readAsDataURL(infor.getFoto().files[i]);
                        ImgRead.onload = function (oFREvent) {
                            if (oFREvent.target.result.includes("image/jpg") || oFREvent.target.result.includes("image/png") || oFREvent.target.result.includes("image/jpeg")) {
                                let newMessage;
                                NMensagens = NMensagens + 1;
                                newMessage =
                                    '<div class="w3-col s12 m12 l12 w3-animate-right" data-estagiario="right">' +
                                    '<div class="w3-col s12 l10 m10 usuario w3-right MensagemEstagiario">' +
                                    '<img src="img/perfil.png" class="perfil" />' +
                                    '<cite>' + 'Você' + '</cite>' + ': ' + '<img src="' + oFREvent.target.result + '" class="w3-round" onlick="AmpliarImagem(this)" />' +
                                    '</div>' +
                                    '</div>';
                                Chat.innerHTML = Chat.innerHTML.replace("w3-animate-left", "").replace("w3-animate-right", "") + newMessage;
                                Chat.scrollTop = Chat.scrollHeight;
                            }
                        };
                    }
                    Foto.value = "";
                } else {
                    //  document.getElementById("AvisoComunicacao").style.display = "block";
                }
            };
        } catch (err) {
            console.log(err.message);
        }
    }
    VerificarOnline() {
        try {
            let ajax = iniciarAjax(); // Inicia Ajax
            if (ajax) { // Verifica se Ajax está ativo
                ajax.onreadystatechange = function () { // Evento de mudança de estado
                    if (ajax.readyState == 4) { // Condição baseada no estado da REQUISIÇÃO
                        if (ajax.status == 200 || ajax.status == 304) { // Condição baseada no estado da RESPOSTA
                            PessoasOnline = ajax.responseText.split('|');
                        } else {
                            // alert("Problema de comunicação");
                        }
                    }
                };
                ajax.open("GET", "conteudo/Online.txt", true); // Define a requisição
                ajax.onload = function () {
                    let data = new Date();
                    let PessoasOn = document.querySelector("#PessoasOn");
                    data.getTimezoneOffset() / 60;
                    let Mes = data.getMonth() + 1;
                    let Hora = data.getHours();
                    let Minutos = data.getMinutes();
                    let Segundos = data.getSeconds();
                    if (Mes < 10) {
                        Mes = "0" + Mes;
                    }
                    if (data.getHours() < 10) {
                        Hora = "0" + data.getHours();
                    }
                    if (data.getMinutes() < 10) {
                        Minutos = "0" + data.getMinutes();
                    }
                    if (data.getSeconds() < 10) {
                        Segundos = "0" + data.getSeconds();
                    }
                    let ValorData = data.getFullYear() + "-" + Mes + "-" + data.getDate();
                    let ValorHora = Hora + "" + Minutos + "" + Segundos;
                    PessoasOn.innerHTML = "";
                    PessoasOn.innerHTML = "<span class=\"PessoasOnline w3-center\">Últimos 2min</span>";
                    PessoasOnline.forEach((pessoa) => {
                        let VerPessoa = pessoa.split(",");
                        if (VerPessoa[1] == ValorData && VerPessoa[0] != sessionStorage.getItem("Estagiario")) {
                            let SegundosOn = ValorHora - VerPessoa[2];
                            if (SegundosOn < 120) {
                                PessoasOn.innerHTML += "<span class=\"PessoasOnline w3-left\"><img src=\"img/verde.png\" class=\"imgverde\" />" + VerPessoa[0] + "</span>";
                            } else {
                                PessoasOn.innerHTML += "<span class=\"PessoasOnline w3-left\"><img src=\"img/vermelho.png\" class=\"imgvermelho\" />" + VerPessoa[0] + "</span>\n";
                            }
                        }
                    });
                };
                ajax.send(null); // Envia requisição
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    AtualizarOnline() {
        try {
            let ajax = iniciarAjax(); // Inicia Ajax
            let data = new Date();
            data.getTimezoneOffset() / 60;
            let Mes = data.getMonth() + 1;
            let Hora = data.getHours();
            let Minutos = data.getMinutes();
            let Segundos = data.getSeconds();
            if (Mes < 10) {
                Mes = "0" + Mes;
            }
            if (data.getHours() < 10) {
                Hora = "0" + data.getHours();
            }
            if (data.getMinutes() < 10) {
                Minutos = "0" + data.getMinutes();
            }
            if (data.getSeconds() < 10) {
                Segundos = "0" + data.getSeconds();
            }
            let ValorData = data.getFullYear() + "-" + Mes + "-" + data.getDate();
            let ValorHora = Hora + "" + Minutos + "" + Segundos;
            if (ajax) { // Verifica se Ajax está ativo
                ajax.open("GET", "processos/Online.php?Estagiario=" + sessionStorage.getItem("Estagiario") + "&Data=" + ValorData + "&Hora=" + ValorHora, true); // Define a requisição
                ajax.send(null); // Envia requisição
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}
var Control = new Controle();