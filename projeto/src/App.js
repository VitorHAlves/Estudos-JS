import './App.css';

const challenges = [
  { id: '01', icon: 'lock', category: 'Visibilidade', title: 'Tornar a conta privada', description: 'Quem pode acompanhar o que você compartilha? Explore as escolhas que controlam a visibilidade da sua conta.', lesson: 'Controle de audiência', color: 'green' },
  { id: '02', icon: 'sliders', category: 'Seus dados', title: 'Desativar anúncios personalizados', description: 'Entenda como suas preferências podem ser usadas em anúncios e aprenda a reconhecer opções que dificultam sua escolha.', lesson: 'Uso de dados pessoais', color: 'purple' },
  { id: '03', icon: 'tag', category: 'Sua identidade', title: 'Revisar marcações no perfil', description: 'Uma marcação também diz algo sobre você. Descubra como revisar o que aparece no seu perfil antes da publicação.', lesson: 'Autonomia sobre o perfil', color: 'orange' },
];

function Icon({ name, ...props }) {
  const paths = {
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    sliders: <><path d="M4 7h6m4 0h6M4 17h10m4 0h2" /><circle cx="12" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></>,
    tag: <><path d="M20 13l-7 7a2 2 0 0 1-3 0l-7-7V4h9l8 6a2 2 0 0 1 0 3Z" /><circle cx="7.5" cy="8" r="1" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="PrivacyLab — início"><span className="brand-icon"><Icon name="shield" /></span>Privacy<span className="brand-light">Lab</span></a>
          <nav aria-label="Navegação principal"><a href="#desafios">Explorar desafios <span aria-hidden="true">↗</span></a></nav>
          <span className="header-label"><span className="status-dot" /> Laboratório educativo</span>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero container" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="small-line" /> SUAS ESCOLHAS. SUA PRIVACIDADE.</span>
            <h1 id="hero-title">Mais consciência.<br />Mais controle.<br /><span>Mais privacidade.</span></h1>
            <p>Um espaço para entender suas configurações de privacidade e reconhecer as armadilhas escondidas nas interfaces do dia a dia.</p>
            <a className="primary-link" href="#desafios">Conheça os desafios <Icon name="arrow" /></a>
            <span className="hero-note">Aprenda no seu ritmo. Sem usar dados reais.</span>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <span className="visual-caption">PRIVACIDADE POR ESCOLHA</span>
            <div className="privacy-panel">
              <div className="panel-top"><span className="mini-icon"><Icon name="shield" /></span><span>Meu espaço digital<small>Você no controle</small></span><span className="panel-dots">•••</span></div>
              <div className="setting-row"><span>Conta privada<small>Compartilhe com quem você escolhe</small></span><span className="toggle on" /></div>
              <div className="setting-row"><span>Anúncios personalizados<small>Seus interesses pertencem a você</small></span><span className="toggle" /></div>
              <div className="setting-row"><span>Revisão de marcações<small>Sua identidade, suas decisões</small></span><span className="toggle on" /></div>
              <div className="panel-bottom"><span className="status-dot" /> Pequenas escolhas fazem diferença.</div>
            </div>
            <div className="floating-note"><Icon name="lock" /><span>O controle começa<br /><strong>com informação.</strong></span></div>
            <span className="visual-footnote">Ilustração de configurações · sem interação</span>
          </div>
        </section>

        <section className="challenges-section" id="desafios" aria-labelledby="challenges-title">
          <div className="container">
            <div className="section-heading"><div><span className="eyebrow">EXPLORE O LABORATÓRIO</span><h2 id="challenges-title">Uma escolha de cada vez.</h2></div><p>Três situações do cotidiano.<br />Novas formas de olhar para sua privacidade.</p></div>
            <div className="challenge-grid">{challenges.map(challenge => (
              <article className={`challenge-card ${challenge.color}`} key={challenge.id}>
                <div className="card-top"><span className="challenge-icon"><Icon name={challenge.icon} /></span><span className="challenge-number">/ {challenge.id}</span></div>
                <span className="category">{challenge.category}</span>
                <h3>{challenge.title}</h3><p>{challenge.description}</p>
                <div className="card-footer"><span>{challenge.lesson}</span><span className="coming-soon">Em breve</span></div>
              </article>
            ))}</div>
            <p className="availability-note">Este é o começo do PrivacyLab. Os desafios interativos estarão disponíveis em uma próxima etapa.</p>
            <aside className="learning-note"><span className="learning-symbol" aria-hidden="true">i</span><div><h3>Entender também é se proteger.</h3><p>Privacy literacy é saber como seus dados são usados e fazer escolhas informadas. Aqui, você vai conhecer padrões enganosos: decisões de interface que podem induzir você a compartilhar mais do que gostaria.</p></div><span className="note-label">CONHECER → QUESTIONAR → ESCOLHER</span></aside>
          </div>
        </section>
      </main>
      <footer className="site-footer container"><span className="footer-brand">PrivacyLab<span> · Um laboratório de escolhas conscientes.</span></span><span>Projeto educativo · Nenhuma conta real é alterada.</span></footer>
    </div>
  );
}

export default App;
