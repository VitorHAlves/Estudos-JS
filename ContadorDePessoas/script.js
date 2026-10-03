let homens = 0;
let mulheres = 0;

function alterar(tipo, qtd) {
    if (tipo === 'homens') {
        homens = Math.max(0, homens + qtd);
        document.getElementById('valor-homens').innerText = homens;
    } else if (tipo === 'mulheres') {
        mulheres = Math.max(0, mulheres + qtd);
        document.getElementById('valor-mulheres').innerText = mulheres;
    }
    atualizarTotal();
}

function atualizarTotal() {
    const total = homens + mulheres;
    document.getElementById('total-geral').innerText = total;
}

function zerar() {
    homens = 0;
    mulheres = 0;
    document.getElementById('valor-homens').innerText = homens;
    document.getElementById('valor-mulheres').innerText = mulheres;
    atualizarTotal();
}