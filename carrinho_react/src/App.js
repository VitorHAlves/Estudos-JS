import React, { useState } from 'react';

function App() {
  const produtosDisponiveis = [
    { id: 1, nome: 'Teclado Mecânico', preco: 250.0 },
    { id: 2, nome: 'Mouse Gamer', preco: 120.0 },
    { id: 3, nome: 'Monitor 24"', preco: 850.0 },
    { id: 4, nome: 'Headset Stereo', preco: 200.0 }
  ];

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (id) => {
    const itemExistente = carrinho.find((item) => item.id === id);

    if (itemExistente.quantidade > 1) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    } else {
      setCarrinho(carrinho.filter((item) => item.id !== id));
    }
  };

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <div style={estiloContainer}>
      <div style={estiloLayout}>
        <div style={estiloSecao}>
          <h2 style={estiloTitulo}>Produtos Disponíveis</h2>
          <div style={estiloGridProdutos}>
            {produtosDisponiveis.map((produto) => (
              <div key={produto.id} style={estiloCardProduto}>
                <h3 style={estiloNomeProduto}>{produto.nome}</h3>
                <p style={estiloPreco}>R$ {produto.preco.toFixed(2)}</p>
                <button
                  style={botaoAdicionar}
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={estiloSecao}>
          <h2 style={estiloTitulo}>Seu Carrinho</h2>
          <div style={estiloCardCarrinho}>
            {carrinho.length === 0 ? (
              <p style={estiloVazio}>O carrinho está vazio.</p>
            ) : (
              <div>
                {carrinho.map((item) => (
                  <div key={item.id} style={estiloItemCarrinho}>
                    <div>
                      <strong style={estiloNomeItem}>{item.nome}</strong>
                      <div style={estiloSubtotalItem}>
                        {item.quantidade}x R$ {item.preco.toFixed(2)} = R${' '}
                        {(item.preco * item.quantidade).toFixed(2)}
                      </div>
                    </div>
                    <div style={estiloControles}>
                      <button
                        style={botaoRemover}
                        onClick={() => removerDoCarrinho(item.id)}
                      >
                        -
                      </button>
                      <span style={estiloQtd}>{item.quantidade}</span>
                      <button
                        style={botaoAdicionarMais}
                        onClick={() => adicionarAoCarrinho(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div style={estiloTotalContainer}>
                  <span>Total:</span>
                  <span style={estiloValorTotal}>
                    R$ {valorTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const estiloContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#0f172a',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  padding: '20px'
};

const estiloLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  maxWidth: '900px',
  width: '100%'
};

const estiloSecao = {
  display: 'flex',
  flexDirection: 'column'
};

const estiloTitulo = {
  color: '#ffffff',
  fontSize: '20px',
  marginBottom: '16px'
};

const estiloGridProdutos = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const estiloCardProduto = {
  backgroundColor: '#1e293b',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
};

const estiloNomeProduto = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 4px 0'
};

const estiloPreco = {
  color: '#94a3b8',
  margin: 0,
  fontSize: '14px'
};

const botaoAdicionar = {
  backgroundColor: '#22c55e',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 12px',
  cursor: 'pointer',
  fontWeight: '600'
};

const estiloCardCarrinho = {
  backgroundColor: '#1e293b',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
  minHeight: '200px'
};

const estiloVazio = {
  color: '#64748b',
  textAlign: 'center',
  marginTop: '40px'
};

const estiloItemCarrinho = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #334155',
  paddingBottom: '12px',
  marginBottom: '12px'
};

const estiloNomeItem = {
  color: '#ffffff',
  display: 'block'
};

const estiloSubtotalItem = {
  color: '#94a3b8',
  fontSize: '13px',
  marginTop: '4px'
};

const estiloControles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const estiloQtd = {
  color: '#ffffff',
  fontWeight: 'bold'
};

const botaoRemover = {
  backgroundColor: '#ef4444',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  width: '28px',
  height: '28px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const botaoAdicionarMais = {
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  width: '28px',
  height: '28px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const estiloTotalContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  paddingTop: '12px',
  borderTop: '2px solid #334155',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold'
};

const estiloValorTotal = {
  color: '#22c55e'
};

export default App;