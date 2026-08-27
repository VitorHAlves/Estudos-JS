function calcularTroco (valorCompra, pagamento){
    const troco = pagamento - valorCompra;
    console.log(`O troco é de R$ ${troco.toFixed(2)}`);
}
calcularTroco(37.50,50.00);