const calculaJurosComp = (capital,juros,tempo) => {
    const montante = capital * ((1 + (juros/100)) ** tempo);
    return Math.round(montante);
}
console.log(`Valor final: R$ ${calculaJurosComp(1000,5,12)}`);