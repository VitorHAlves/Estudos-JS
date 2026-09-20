
let tarefas = [];

let proximoId = 1;


const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const estadoVazio = document.getElementById("estado-vazio");
const contagemTexto = document.getElementById("contagem-texto");


function renderizar() {
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    estadoVazio.classList.remove("d-none");
  } else {
    estadoVazio.classList.add("d-none");

    tarefas.forEach(function (tarefa) {
      const item = criarItemTarefa(tarefa);
      lista.appendChild(item);
    });
  }

  atualizarContagem();
}

function atualizarContagem() {
  const total = tarefas.length;
  let concluidas = 0;

  tarefas.forEach(function (tarefa) {
    if (tarefa.concluida) {
      concluidas = concluidas + 1;
    }
  });

  if (total === 0) {
    contagemTexto.textContent = "Nenhuma missão registrada ainda.";
  } else {
    contagemTexto.textContent = concluidas + " de " + total + " missão(ões) cumprida(s).";
  }
}


function criarItemTarefa(tarefa) {
  const item = document.createElement("li");
  item.className = "task-entry";
  if (tarefa.concluida) {
    item.classList.add("concluida");
  }


  const btnCheck = document.createElement("button");
  btnCheck.type = "button";
  btnCheck.className = "check-btn";
  btnCheck.title = "Marcar como concluída";
  btnCheck.innerHTML = '<span class="check-mark">✓</span>';
  btnCheck.addEventListener("click", function () {
    alternarConclusao(tarefa.id);
  });


  const corpo = document.createElement("div");
  corpo.className = "task-body";

  const texto = document.createElement("span");
  texto.className = "task-text";
  texto.textContent = tarefa.texto;
  corpo.appendChild(texto);


  const acoes = document.createElement("div");
  acoes.className = "task-actions";

  const btnEditar = document.createElement("button");
  btnEditar.type = "button";
  btnEditar.className = "icon-btn btn-editar";
  btnEditar.title = "Editar tarefa";
  btnEditar.textContent = "✎";
  btnEditar.addEventListener("click", function () {
    editarTarefa(tarefa.id);
  });

  const btnExcluir = document.createElement("button");
  btnExcluir.type = "button";
  btnExcluir.className = "icon-btn btn-excluir";
  btnExcluir.title = "Excluir tarefa";
  btnExcluir.textContent = "🗑";
  btnExcluir.addEventListener("click", function () {
    excluirTarefa(tarefa.id);
  });

  acoes.appendChild(btnEditar);
  acoes.appendChild(btnExcluir);

  item.appendChild(btnCheck);
  item.appendChild(corpo);
  item.appendChild(acoes);

  return item;
}

function adicionarTarefa(texto) {
  const textoLimpo = texto.trim();
  if (textoLimpo === "") {
    return;
  }

  const novaTarefa = {
    id: proximoId,
    texto: textoLimpo,
    concluida: false
  };

  proximoId = proximoId + 1;
  tarefas.push(novaTarefa);
  renderizar();
}

function excluirTarefa(id) {
  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== id;
  });
  renderizar();
}

function alternarConclusao(id) {
  tarefas.forEach(function (tarefa) {
    if (tarefa.id === id) {
      tarefa.concluida = !tarefa.concluida;
    }
  });
  renderizar();
}

function editarTarefa(id) {
  tarefas.forEach(function (tarefa) {
    if (tarefa.id === id) {
      const novoTexto = prompt("Editar missão:", tarefa.texto);

      if (novoTexto !== null && novoTexto.trim() !== "") {
        tarefa.texto = novoTexto.trim();
      }
    }
  });
  renderizar();
}


form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  adicionarTarefa(input.value);
  input.value = "";
  input.focus();
});

renderizar();
