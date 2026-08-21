
if(true){
    var x = 10;
    var y = 20;
    var z = 30;
}

console.log(x);
console.log(y);
console.log(z);


const frutas = ['tomate','cachorro','aviao','Macedônia'];
console.log(frutas[0+1]);

let a = frutas.pop();
console.log(a);

frutas.shift()
console.log(frutas);

frutas.unshift('comeco');
console.log(frutas);

const numeros = [1,2,3,4];

const pares = numeros.filter(n => n % 2 == 0)
console.log(pares);

const dobro = numeros.map(n => n * 2);
console.log(dobro);

const letras = ['a','b','c'];

for (let i = 0; i < letras.length; i++) {
    console.log(letras[i]);
    
}

letras.forEach(letra => {console.log(letra)});

for (const letra of letras){
    console.log(letra);
}