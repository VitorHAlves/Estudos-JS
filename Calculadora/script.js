let displayElement = document.getElementById('display');
let historicoElement = document.getElementById('historico');
let valorAtual = '0';
let valorAnterior = null;
let operacaoAtual = null;
let reiniciarTela = false;

function atualizarDisplay() {
    displayElement.innerText = valorAtual.replace('.', ',');
}

function limparSelecaoOperadores() {
    const operadores = document.querySelectorAll('.btn.operator');
    operadores.forEach(op => op.classList.remove('ativo'));
}

function inserirNumero(numero) {
    if (valorAtual === '0' || reiniciarTela) {
        valorAtual = numero;
        reiniciarTela = false;
    } else {
        valorAtual += numero;
    }
    atualizarDisplay();
}

function inserirDecimal() {
    if (reiniciarTela) {
        valorAtual = '0,';
        reiniciarTela = false;
        atualizarDisplay();
        return;
    }
    if (!valorAtual.includes('.')) {
        valorAtual += '.';
        atualizarDisplay();
    }
}

function limpar() {
    valorAtual = '0';
    valorAnterior = null;
    operacaoAtual = null;
    historicoElement.innerText = '';
    limparSelecaoOperadores();
    atualizarDisplay();
}

function inverterSinal() {
    if (valorAtual !== '0') {
        if (valorAtual.startsWith('-')) {
            valorAtual = valorAtual.slice(1);
        } else {
            valorAtual = '-' + valorAtual;
        }
        atualizarDisplay();
    }
}

function porcentagem() {
    let numero = parseFloat(valorAtual.replace(',', '.'));
    valorAtual = String(numero / 100);
    atualizarDisplay();
}

function definirOperacao(operacao) {
    limparSelecaoOperadores();
    
   
    let btnId = '';
    if (operacao === '+') btnId = 'btn-soma';
    if (operacao === '-') btnId = 'btn-sub';
    if (operacao === '×') btnId = 'btn-mult';
    if (operacao === '÷') btnId = 'btn-div';
    
    if (btnId) {
        document.getElementById(btnId).classList.add('ativo');
    }

    if (operacaoAtual !== null && !reiniciarTela) {
        calcular();
    }
    
    valorAnterior = valorAtual;
    operacaoAtual = operacao;
    
    
    historicoElement.innerText = `${valorAnterior.replace('.', ',')} ${operacaoAtual}`;
    reiniciarTela = true;
}

function calcular() {
    if (operacaoAtual === null || reiniciarTela) return;
    
    let atual = parseFloat(valorAtual.replace(',', '.'));
    let anterior = parseFloat(valorAnterior.replace(',', '.'));
    let resultado = 0;

    switch (operacaoAtual) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '×':
            resultado = anterior * atual;
            break;
        case '÷':
            if (atual === 0) {
                alert("Erro: Divisão por zero!");
                limpar();
                return;
            }
            resultado = anterior / atual;
            break;
        default:
            return;
    }

    historicoElement.innerText = `${valorAnterior.replace('.', ',')} ${operacaoAtual} ${valorAtual.replace('.', ',')} =`;
    valorAtual = String(resultado).replace('.', ',');
    operacaoAtual = null;
    limparSelecaoOperadores();
    reiniciarTela = true;
    atualizarDisplay();
}