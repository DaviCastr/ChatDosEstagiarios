window.addEventListener("storage", VerificaAba, false);
// FazerVerificacao();
window.addEventListener("load", () => {
    let Ct = document.querySelector("#Chat");
    let Nm = document.querySelector("#NomeEstagiario");
    let Ip = document.querySelector("#Estagiario");
    let Form = document.querySelector("#Formulario");
    let Lgin = document.querySelector("#Login");
    let FormMob = document.querySelector("#FormularioMobile");
    let IpM = document.querySelector("#EstagiarioMobile");
    VerificaSessao(Ct, Nm, Form, FormMob, Lgin, Ip, IpM);
});
InserirLink.addEventListener('click', () => {
    //    Mensagem.value += "<a href=' ' target='blank' > Link</a>";
});
InserirImg.addEventListener('click', () => {
    document.querySelector("#InserirFoto").style.display = "block";
});
InserirImgMob.addEventListener('click', () => {
    document.querySelector("#InserirFoto").style.display = "block";
});
Negrito.addEventListener('click', () => {
    //    Mensagem.value += "<b> </b>";
});
//    Mensagem.addEventListener('keypress', (e) => {
//         ValidarTecla();
//    });
//Verificação de permissão para notificações
document.addEventListener('DOMContentLoaded', function () {
    VerificaPermissao();
});

Login.addEventListener('submit', (e) => {
    e.preventDefault();
    let Ct = document.querySelector("#Chat");
    let Nm = document.querySelector("#NomeEstagiario");
    let Ip = document.querySelector("#Estagiario");
    let IpM = document.querySelector("#EstagiarioMobile");
    let IMss = document.querySelector("#Mensagem");
    let IMssM = document.querySelector("#MensagemMobile");
    FazerLogin(Login, Ct, Nm, Ip, IpM, IMss, IMssM);
});
Sair.addEventListener("click", (e) => {
    let Form = document.querySelector("#Formulario");
    let Lgin = document.querySelector("#Login");
    let FormMob = document.querySelector("#FormularioMobile");
    let Ct = document.querySelector("#Chat");
    FazerLogout(Ct, Form, FormMob, Lgin);
});
FormularioMobile.addEventListener('submit', (e) => {
    e.preventDefault();
    let Ct = document.querySelector("#Chat");
    EnviarMensagem(FormularioMobile, Ct);
});
Formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let Ct = document.querySelector("#Chat");
    EnviarMensagem(Formulario, Ct);
});
Foto.onchange = function () {
    let View = document.getElementById("View");
    let Retorno = document.getElementById("enviaFoto");
    MudaPreview(Retorno, Foto, View);
}
FormularioFotos.addEventListener("submit", (e) => {
    e.preventDefault();
    let View = document.getElementById("View");
    let BProg = document.getElementById("barradeProgresso");
    let Retorno = document.getElementById("enviaFoto");
    let Porcento = document.querySelector("#ProgressoPCT");
    let Ct = document.querySelector("#Chat");
    EnviarFoto(FormularioFotos, BProg, Retorno, Porcento, Ct, View);
});

if (IsNotify) {
    document.body.onmouseover = function (e) {
        MudaNotificacao();
    }
    document.body.onmouseout = function (e) {
        MudaNotificacao();
    }
}
Mensagem.addEventListener('keypress',(e)=>{
 var form = document.forms.Formulario;
 let Ct = document.querySelector("#Chat");
 if(Mensagem.value.length > 1){
     ValidarTecla(e,form, Ct);
 }
});
MensagemMob.addEventListener('keypress',(e)=>{
 var formMob = document.forms.FormularioMobile;
 let Ct = document.querySelector("#Chat");
 if(MensagemMob.value.length > 1){
     ValidarTecla(e,formMob, Ct);
 }
});