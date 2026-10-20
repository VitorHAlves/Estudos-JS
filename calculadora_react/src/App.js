import React, { useState } from 'react';

function App() {
  const [visor, setVisor] = useState('');

  const adicionarCaractere = (valor) => {
    setVisor(visor + valor);
  };

  const limpar = () => {
    setVisor('');
  };

  const apagarUltimo = () => {
    setVisor(visor.slice(0, -1));
  };

  const calcular = () => {
    try {
      if (!visor) return;
      const expressao = visor.replace(/÷/g, '/').replace(/×/g, '*');
      const resultado = eval(expressao);

      // Limita a 8 casas decimais se for um número com dízima e remove zeros desnecessários
      if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
        setVisor(String(parseFloat(resultado.toFixed(8))));
      } else {
        setVisor(String(resultado));
      }
    } catch (error) {
      setVisor('Erro');
    }
  };

  return (
    <div style={estiloContainer}>
      <div style={estiloCalculadora}>
        <div style={estiloVisor}>
          {visor || '0'}
        </div>
        
        <div style={estiloTeclado}>
          <button style={{ ...estiloBotao, ...botaoFuncao }} onClick={limpar}>C</button>
          <button style={{ ...estiloBotao, ...botaoFuncao }} onClick={apagarUltimo}>⌫</button>
          <button style={{ ...estiloBotao, ...botaoOperacao }} onClick={() => adicionarCaractere('÷')}>÷</button>
          <button style={{ ...estiloBotao, ...botaoOperacao }} onClick={() => adicionarCaractere('×')}>×</button>

          <button style={estiloBotao} onClick={() => adicionarCaractere('7')}>7</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('8')}>8</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('9')}>9</button>
          <button style={{ ...estiloBotao, ...botaoOperacao }} onClick={() => adicionarCaractere('-')}>-</button>

          <button style={estiloBotao} onClick={() => adicionarCaractere('4')}>4</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('5')}>5</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('6')}>6</button>
          <button style={{ ...estiloBotao, ...botaoOperacao }} onClick={() => adicionarCaractere('+')}>+</button>

          <button style={estiloBotao} onClick={() => adicionarCaractere('1')}>1</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('2')}>2</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('3')}>3</button>
          <button style={{ ...estiloBotao, ...botaoIgual }} onClick={calcular}>=</button>

          <button style={{ ...estiloBotao, ...botaoZero }} onClick={() => adicionarCaractere('0')}>0</button>
          <button style={estiloBotao} onClick={() => adicionarCaractere('.')}>,</button>
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

const estiloCalculadora = {
  backgroundColor: '#1e293b',
  borderRadius: '24px',
  padding: '24px',
  width: '320px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
};

const estiloVisor = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '90px',
  padding: '0 16px',
  marginBottom: '20px',
  backgroundColor: '#0f172a',
  borderRadius: '16px',
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: 'bold',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all'
};

const estiloTeclado = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '12px'
};

const estiloBotao = {
  border: 'none',
  borderRadius: '50%',
  aspectRatio: '1',
  fontSize: '22px',
  fontWeight: '600',
  cursor: 'pointer',
  backgroundColor: '#334155',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none'
};

const botaoFuncao = {
  backgroundColor: '#64748b',
  color: '#0f172a'
};

const botaoOperacao = {
  backgroundColor: '#f97316',
  color: '#ffffff'
};

const botaoIgual = {
  backgroundColor: '#ea580c',
  color: '#ffffff'
};

const botaoZero = {
  gridColumn: 'span 2',
  borderRadius: '30px',
  aspectRatio: 'auto',
  height: '100%',
  paddingLeft: '24px',
  justifyContent: 'flex-start'
};

export default App;