const notas = [10,4,5,6];
let soma = 0;
notas.forEach(nota => {soma+= nota});
let media = soma / notas.length;
console.log(`A média é: ${media}`);