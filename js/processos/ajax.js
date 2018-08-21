function iniciarAjax() {
    var objetoAjax = false; // Variável que recebe obj
    if (window.XMLHttpRequest) { // Firefox e demais Browsers
        objetoAjax = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 9 ou >
        objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        if (!objetoAjax) { // IE 8 ou <
            objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return objetoAjax;
}

function mostrarResposta(elemento, ajax) {
    if (ajax.readyState == 4) { // Condição baseada no estado da REQUISIÇÃO 		if(ajax.status == 200 || ajax.status == 304){ // Condição baseada no estado da RESPOSTA
        elemento.innerHTML = ajax.responseText;
    } else {
        // alert("Problema de comunicação");
    }
}


function carregando(container) { // Recebe Elemento como argumento
    // Verifica se elemento possui nós filhos
    while (container.hasChildNodes()) {
        // Remove último elemento filho
        container.removeChild(container.lastChild);
    }
    // Cria elemento IMG
    var imagem = document.createElement("img");
    // Define os atributos
    imagem.setAttribute("src", "img/preloader6.gif");
    imagem.setAttribute("style", "opacity: 0.8;width: 150px;height: 150px;display:block;border-radius: 100px; margin-left: auto;margin-right:auto;margin-bottom:250px;margin-top:150px;");
    imagem.setAttribute("width", "400");
    imagem.setAttribute("height", "400");

    // Adiciona imagem como nó filho do elemento
    container.appendChild(imagem);
}

function requisitarArquivo(arquivo, elemento) {
    var ajax = iniciarAjax(); // Inicia Ajax
    if (ajax) { // Verifica se Ajax está ativo
        ajax.onreadystatechange = function() { // Evento de mudança de estado
            mostrarResposta(elemento, ajax); // Execução da resposta da requisição
        };
        ajax.open("GET", arquivo, true); // Define a requisição
        ajax.send(null); // Envia requisição
        return true;
    } else {
        return false;
    }

}
function VerificarArquivo(arquivo,valorsplit) {
    let ajax = iniciarAjax(); // Inicia Ajax

    if (ajax) { // Verifica se Ajax está ativo
        ajax.onreadystatechange = function () { // Evento de mudança de estado
            if (ajax.readyState == 4) { // Condição baseada no estado da REQUISIÇÃO
                if (ajax.status == 200 || ajax.status == 304) { // Condição baseada no estado da RESPOSTA
                    NMensagensNovas = ajax.responseText.split(valorsplit);
                } else {
                    // alert("Problema ao se Conectar ao Chat por Favor Atualize seu Browser");
                }
            }
        };
        ajax.open("GET",arquivo, true); // Define a requisição
        ajax.send(null); // Envia requisição
        ajax.onload = function () {
            return NMensagensNovas;
        };
    } else {
        return null;
    }

}