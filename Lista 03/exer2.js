function verificarAprovacao(nota){
    return nota >= 7 ? "Aprovado" : "Reprovado";
}

console.log(verificarAprovacao(8.5));
console.log(verificarAprovacao(5.0));