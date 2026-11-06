# PrivacyLab

Página inicial de um simulador educativo de configurações de privacidade, inspirado em privacy literacy (compreensão do uso de dados e escolhas informadas) e padrões enganosos de interface.

## Estrutura

O projeto mantém a base existente do Create React App, com React em JavaScript e CSS puro. Não adiciona dependências, backend, roteamento ou coleta de dados.

- `src/App.js`: cabeçalho, apresentação, ilustração estática e três cards de desafios.
- `src/App.css`: estilos da página e adaptações para celulares e tablets.
- `src/index.css`: estilos globais, foco de teclado e preferência por movimento reduzido.
- `src/App.test.js`: verificação da apresentação, cards e navegação por âncora.
- `public/index.html` e `public/manifest.json`: idioma e identificação do PrivacyLab.

Os desafios de tornar a conta privada, desativar anúncios personalizados e revisar marcações estão sinalizados como **Em breve**. Nesta etapa, somente a página inicial está implementada; os controles da ilustração são decorativos e não alteram configurações reais.

## Executar

Com Node.js e npm instalados, na pasta do projeto:

```bash
npm install
npm start
```

Se as dependências já estiverem instaladas, execute apenas `npm start`. Acesse http://localhost:3000. Alterações no código atualizam a página durante o desenvolvimento.

## Validar e gerar a versão de produção

```bash
npm test -- --watchAll=false
npm run build
```

O build de produção é gerado na pasta `build/`.
