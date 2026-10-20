import React, { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  const zerar = () => {
    setContador(0);
  };

  return (
    <div style={estiloContainer}>
      <div style={estiloCard}>
        <h1 style={estiloTitulo}>Contador de Pessoas</h1>
        
        <div style={estiloDisplay}>
          <span style={estiloNumero}>{contador}</span>
          <span style={estiloRotulo}>{contador === 1 ? 'pessoa' : 'pessoas'}</span>
        </div>

        <div style={estiloBotoes}>
          <button style={{ ...estiloBotao, ...botaoDecrementar }} onClick={decrementar}>
            -
          </button>
          <button style={{ ...estiloBotao, ...botaoZerar }} onClick={zerar}>
            Zerar
          </button>
          <button style={{ ...estiloBotao, ...botaoIncrementar }} onClick={incrementar}>
            +
          </button>
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
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const estiloCard = {
  backgroundColor: '#1e293b',
  borderRadius: '24px',
  padding: '32px',
  width: '320px',
  textAlign: 'center',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
};

const estiloTitulo = {
  color: '#94a3b8',
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '24px'
};

const estiloDisplay = {
  backgroundColor: '#0f172a',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '28px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const estiloNumero = {
  color: '#ffffff',
  fontSize: '64px',
  fontWeight: 'bold',
  lineHeight: '1'
};

const estiloRotulo = {
  color: '#64748b',
  fontSize: '16px',
  marginTop: '8px',
  textTransform: 'lowercase'
};

const estiloBotoes = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px'
};

const estiloBotao = {
  border: 'none',
  borderRadius: '12px',
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: '14px 0',
  flex: '1',
  outline: 'none',
  transition: 'background-color 0.2s'
};

const botaoIncrementar = {
  backgroundColor: '#22c55e',
  color: '#ffffff'
};

const botaoDecrementar = {
  backgroundColor: '#ef4444',
  color: '#ffffff'
};

const botaoZerar = {
  backgroundColor: '#334155',
  color: '#94a3b8',
  fontSize: '14px'
};

export default App;