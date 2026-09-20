const pessoa = {
    nome: "Zoro",
    idade: 21,
    profissao: "Espadachim"
};
//ex1
console.log(pessoa);

//ex2
console.log(pessoa.nome);

//ex3
pessoa.idade = 22;
console.log(pessoa);

//ex4
pessoa.cidade = "Presidente Prudente";
console.log(pessoa);

//ex5
function formatarDadosPessoa(p){
    return `Olá, meu nome é ${p.nome}, tenho ${p.idade} anos e atuo como ${p.profissao}.`;
}
console.log(formatarDadosPessoa(pessoa));

//ex6
const listaPessoas = [
    { nome: "Nami", idade: 20},
    { nome: "Luffy", idade: 19},
    { nome: "Rayleigh", idade: 78}
]
console.log(listaPessoas);

//ex7
listaPessoas.forEach(p => {
    if(p.idade >= 18) {
        console.log(p.nome);
    }
})

//ex8
const produto = {
    preco: 15.00,
    quantidade: 10
};
const valorTotal = produto.preco * produto.quantidade;
console.log(`Valor total da compra: R$ ${valorTotal.toFixed(2)}`);

//ex9
const livro = {
    titulo: "One Piece: A Grande Era da Pirataria",
    autor: "Eiichiro Oda",
    anoPublicacao: 1997,
    genero: "Ação"
};
console.log(livro);

//ex10
const anoAtual = new Date().getFullYear();
livro.idadePublicacao = anoAtual - livro.anoPublicacao;
const mostrarDetalhes = `Livro: ${livro.titulo}\nAutor: ${livro.autor}\nAno de Publicação: ${livro.anoPublicacao}\nIdade da publicação: ${livro.idadePublicacao} anos`;
console.log(mostrarDetalhes);

//ex11
console.log("Título:", livro["titulo"]);
console.log("Autor:", livro["autor"]);
console.log("Ano de Publicação:", livro["anoPublicacao"]);
console.log("Gênero:", livro["genero"]);
console.log("Idade de Publicação:", livro["idadePublicacao"]);

//ex12
livro.genero = "Aventura";
console.log(livro);

//ex13
livro.editora = "Shueisha";
console.log(livro);

delete livro.editora;
console.log(livro);