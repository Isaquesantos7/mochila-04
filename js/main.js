const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//varrendo a lista itens e criando elementos com os dados contidos
itens.forEach( (elemento) => {
    criaElemento(elemento);
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    /* Recebi os elementos do input */
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //varificar se o nome do elemento e igual ao valor recebido na varial nome.
    const existe = itens.find( elemento => elemento.nome === nome.value ); 

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //verifica se o item atual contem um id
    if (existe) {
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? itens[itens.length -1].id + 1 : 0;    

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

//Criando elementos
function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

//atualizando elementos
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//Criando botao que deleta o elemento
function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    //adicionando o evento click ao botao
    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

//Deletando elementos
function deletaElemento(tag, id) {
    tag.remove();

    //Encontrando id do elemento e removendo da lista
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //Repassando os elementos da lista ao localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
}