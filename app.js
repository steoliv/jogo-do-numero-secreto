let listaDeNumerosSorteados = [];
let limiteDeElementos = 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função para alterar textos no html 
function exibirTextonaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    //condição para colocar voz na leitra do texto do H1 e P
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagensInicias(){
    //passando parametros para a função exibirTextonaTela
    exibirTextonaTela('h1', 'Jogo do número secreto');
    exibirTextonaTela('p', 'Adivinhe o número secreto de 1 a 20');
}
exibirMensagensInicias();

//Verificando chute
function verificarChute(){
    let chute = document.querySelector('input').value;
//verificando se chute é igual numero secreto
    if(chute == numeroSecreto){ 
        exibirTextonaTela('h1', 'Parabéns você acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativa = `Você descobriu o numero secreto! com ${tentativas} ${palavraTentativa} `;
        exibirTextonaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');//ativar btn de novo jogo
        document.querySelector('.container__input').style.display = 'none';//tirar input ao acertar
    }else{ // se não for informar se é menor ou maior que o chute
        if(chute > numeroSecreto){
            exibirTextonaTela('p', 'O número secreto é menor');
        }else{
            exibirTextonaTela('p', 'O número secreto é maior');
        }
    }
    tentativas++;//incrementar tentativas
    limparChute(); //chamar função para limpar o input quando errar
}

//função para gerar numero aleatorio
function gerarNumeroAleatorio(){
    let numeroEscolhdo = parseInt(Math.random() * limiteDeElementos + 1);
    let quantidadeDelementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDelementosNaLista == limiteDeElementos){
        listaDeNumerosSorteados = [];
    }

     if(listaDeNumerosSorteados.includes(numeroEscolhdo)){
        return gerarNumeroAleatorio();
     }else{
        listaDeNumerosSorteados.push(numeroEscolhdo);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhdo;
    }
}

//Função para limpar o input
function limparChute(){
    chute = document.querySelector('input');
    chute.value = '';
}

//função para reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparChute();
    exibirMensagensInicias();
    document.getElementById('reiniciar').setAttribute('disabled', true);//desativar btn de novo jogo
    document.querySelector('.container__input').style.display = 'block';//exibir btn de novo
}