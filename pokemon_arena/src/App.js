
import React, { useEffect, useState } from 'react';
import {
  POKEMON, STARTERS, TYPE_COLORS,
  effectiveness, sprite, makePokemon, randomEnemy
} from './data';

const STORAGE = 'pokemon-arena-save-v1';
const starterPokemon = POKEMON.filter(p => STARTERS.includes(p.id));

const initial = () => {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE));
    if (s && Array.isArray(s.team) && s.team.length && s.enemy) {
      return s;
    }
  } catch (e) {}
  return null;
};

function Picture({ pokemon, className = '' }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [pokemon?.id]);

  return (
    <div className={`picture ${className}`}>
      {failed
        ? <span className="sprite-fallback">{pokemon.emoji}</span>
        : <img
            src={sprite(pokemon.id)}
            alt={pokemon.name}
            onError={() => setFailed(true)}
            draggable="false"
          />
      }
    </div>
  );
}

function Type({ name }) {
  return (
    <span
      className="type"
      style={{ '--type': TYPE_COLORS[name] || '#adb5c6' }}
    >
      {name}
    </span>
  );
}

function Life({ pokemon }) {
  const percentage = Math.max(
    0,
    Math.round(pokemon.hp / pokemon.maxHp * 100)
  );

  return (
    <div className="life">
      <div className="life-track">
        <div style={{
          width: `${percentage}%`,
          background: percentage > 50
            ? '#51d9a5'
            : percentage > 23 ? '#f7c45b' : '#ff6b7f'
        }} />
      </div>
      <span>{pokemon.hp} / {pokemon.maxHp} HP</span>
    </div>
  );
}

function App() {
  const [save, setSave] = useState(initial);
  const [tab, setTab] = useState('moves');

  const active = save?.team.find(p => p.uid === save.activeUid)
    || save?.team.find(p => p.hp > 0);

  useEffect(() => {
    if (save) {
      localStorage.setItem(STORAGE, JSON.stringify(save));
    } else {
      localStorage.removeItem(STORAGE);
    }
  }, [save]);

  const start = (starter) => {
    const p = makePokemon(starter);

    setSave({
      team: [p],
      activeUid: p.uid,
      enemy: randomEnemy(1, [p.id]),
      round: 1,
      wins: 0,
      catches: 0,
      balls: 5,
      potions: 3,
      screen: 'battle',
      messages: [
        `Você escolheu ${p.name}!`,
        'Um Pokémon selvagem apareceu!'
      ]
    });

    setTab('moves');
  };

  const addMsg = (s, ...messages) => {
    s.messages = [...s.messages, ...messages].slice(-5);
  };

  const replacement = (s) => s.team.find(p => p.hp > 0);

  const counterattack = (s) => {
    const actor = s.team.find(p => p.uid === s.activeUid);
    if (!actor || actor.hp <= 0) return;

    const move = s.enemy.moves[
      Math.floor(Math.random() * s.enemy.moves.length)
    ];

    const factor = effectiveness(move.type, actor.type);

    const dmg = Math.max(3, Math.round(
      (move.power + s.enemy.attack * .45 - actor.defense * .3)
      * factor * (.83 + Math.random() * .3)
    ));

    actor.hp = Math.max(0, actor.hp - dmg);

    addMsg(s, `${s.enemy.name} usou ${move.name}! (-${dmg} HP)`);

    if (factor > 1) addMsg(s, 'Foi super efetivo!');

    if (actor.hp === 0) {
      addMsg(s, `${actor.name} desmaiou!`);

      const next = replacement(s);

      if (next) {
        s.activeUid = next.uid;
        addMsg(s, `${next.name}, eu escolho você!`);
      } else {
        s.screen = 'gameover';
        addMsg(s, 'Seu time inteiro desmaiou. Fim de jogo!');
      }
    }
  };

  const endEncounter = (s, kind) => {
    s.screen = 'reward';

    if (kind === 'win') {
      s.wins++;
      s.balls += 1;
      s.potions += s.wins % 2 === 0 ? 1 : 0;

      const actor = s.team.find(p => p.uid === s.activeUid);

      if (actor) {
        actor.xp += 45;

        while (actor.xp >= actor.level * 12) {
          actor.xp -= actor.level * 12;
          actor.level++;
          actor.maxHp += 6;
          actor.hp = Math.min(actor.maxHp, actor.hp + 20);
          actor.attack += 1;

          addMsg(s, `${actor.name} subiu para o nível ${actor.level}!`);
        }
      }

      addMsg(
        s,
        'Vitória! +1 Pokébola' +
        (s.wins % 2 === 0 ? ' e +1 poção.' : '.')
      );
    } else {
      addMsg(s, `Você capturou ${s.enemy.name}!`);
    }
  };

  const move = (index) => setSave(old => {
    if (!old || old.screen !== 'battle') return old;

    const s = structuredClone(old);
    const a = s.team.find(p => p.uid === s.activeUid);

    if (!a || a.hp <= 0) return old;

    const attack = a.moves[index];
    const mult = effectiveness(attack.type, s.enemy.type);

    const dmg = Math.max(3, Math.round(
      (attack.power + a.attack * .48 - s.enemy.defense * .3)
      * mult * (.85 + Math.random() * .3)
    ));

    s.enemy.hp = Math.max(0, s.enemy.hp - dmg);

    addMsg(s, `${a.name} usou ${attack.name}! (-${dmg} HP)`);

    if (mult > 1) addMsg(s, 'É super efetivo!');
    if (mult < 1) addMsg(s, 'Não foi muito efetivo...');

    if (s.enemy.hp === 0) {
      endEncounter(s, 'win');
    } else {
      counterattack(s);
    }

    return s;
  });

  const usePotion = () => setSave(old => {
    if (!old || old.screen !== 'battle' || old.potions < 1) return old;

    const s = structuredClone(old);
    const a = s.team.find(p => p.uid === s.activeUid);

    if (!a || a.hp === a.maxHp) return old;

    a.hp = Math.min(a.maxHp, a.hp + 45);
    s.potions--;

    addMsg(s, `Você curou ${a.name} em até 45 HP!`);
    counterattack(s);

    return s;
  });

  const throwBall = () => setSave(old => {
    if (!old || old.screen !== 'battle' || old.balls < 1) return old;

    const s = structuredClone(old);
    s.balls--;

    const ratio = s.enemy.hp / s.enemy.maxHp;
    const chance = Math.min(.94, .16 + (1 - ratio) * .83);

    if (Math.random() < chance) {
      if (s.team.length < 6) {
        s.team.push({
          ...s.enemy,
          uid: `caught-${Date.now()}-${Math.random()}`
        });

        s.catches++;
        endEncounter(s, 'catch');
      } else {
        addMsg(s, 'Capturou, mas o time está cheio (máximo 6)!');
        s.balls++;
      }
    } else {
      addMsg(s, `Oh! ${s.enemy.name} escapou da Pokébola!`);
      counterattack(s);
    }

    return s;
  });

  const switchTo = (uid) => {
    setSave(old => {
      if (!old || old.screen !== 'battle' || old.activeUid === uid) {
        return old;
      }

      const s = structuredClone(old);
      const target = s.team.find(p => p.uid === uid);

      if (!target || target.hp <= 0) return old;

      s.activeUid = uid;
      addMsg(s, `Vai, ${target.name}!`);
      counterattack(s);

      return s;
    });

    setTab('moves');
  };

  const next = () => setSave(old => {
    if (!old || old.screen !== 'reward') return old;

    const s = structuredClone(old);

    s.round++;
    s.enemy = randomEnemy(s.round, s.team.map(x => x.id));
    s.screen = 'battle';
    s.messages = [
      `Rota ${s.round}: ${s.enemy.name} selvagem apareceu!`
    ];

    return s;
  });

  const reset = () => {
    if (window.confirm('Apagar seu progresso e começar outra aventura?')) {
      setSave(null);
      setTab('moves');
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-ball"><span /></div>
          <div>
            <strong>POKÉMON <em>ARENA</em></strong>
            <small>MINI AVENTURA • REACT EDITION</small>
          </div>
        </div>

        <div className="header-right">
          <span className="header-tag">FAN GAME</span>
          {save && (
            <button className="text-button" onClick={reset}>
              ↻ Reiniciar
            </button>
          )}
        </div>
      </header>

      {!save ? (
        <main className="start-page">
          <div className="eyebrow">
            ✦ SUA JORNADA COMEÇA AQUI ✦
          </div>

          <h1>Escolha seu <span>primeiro parceiro.</span></h1>

          <p>
            Explore rotas, enfrente Pokémon selvagens e monte seu
            time dos sonhos. Qual deles vai lutar ao seu lado?
          </p>

          <div className="starters">
            {starterPokemon.map(p => (
              <button
                className="starter"
                key={p.id}
                onClick={() => start(p)}
                style={{ '--accent': TYPE_COLORS[p.type] }}
              >
                <div className="starter-bg" />
                <div className="starter-number">
                  #{String(p.id).padStart(3, '0')}
                </div>

                <Picture pokemon={p} />
                <h2>{p.name}</h2>
                <Type name={p.type} />

                <div className="starter-bottom">
                  <span>ESCOLHER PARCEIRO</span>
                  <span>➜</span>
                </div>
              </button>
            ))}
          </div>

          <div className="start-footer">
            Batalhas por turnos <span>◆</span> Capturas
            <span>◆</span> Evolução de nível
            <span>◆</span> Progresso automático
          </div>
        </main>
      ) : (
        <main className="game-page">
          <div className="game-top">
            <div>
              <div className="eyebrow">✦ SUA AVENTURA</div>
              <h1>Rota <span>{String(save.round).padStart(2, '0')}</span></h1>
            </div>

            <div className="stats">
              <div>
                <strong>{save.wins}</strong>
                <span>VITÓRIAS</span>
              </div>
              <div>
                <strong>{save.catches}</strong>
                <span>CAPTURAS</span>
              </div>
              <div>
                <strong>{save.team.length}<small>/6</small></strong>
                <span>NO TIME</span>
              </div>
            </div>
          </div>

          <div className="main-grid">
            <section className="battle-card">
              <div className="battle-scene">
                <div className="scene-overlay" />
                <div className="scene-sun" />
                <div className="mountains mountains-far" />
                <div className="mountains mountains-near" />
                <div className="field" />

                <div className="scene-label">
                  <span className="live-dot" />
                  ENCONTRO SELVAGEM
                </div>

                <div className="opponent pokemon-slot">
                  <div className="pokemon-data">
                    <div className="pokemon-name">
                      <strong>{save.enemy.name}</strong>
                      <span>NV. {save.enemy.level}</span>
                    </div>
                    <Type name={save.enemy.type} />
                    <Life pokemon={save.enemy} />
                  </div>

                  <Picture
                    pokemon={save.enemy}
                    className="enemy-picture"
                  />
                  <div className="pokemon-shadow" />
                </div>

                {active && (
                  <div className="player pokemon-slot">
                    <Picture
                      pokemon={active}
                      className="player-picture"
                    />
                    <div className="pokemon-shadow" />

                    <div className="pokemon-data">
                      <div className="pokemon-name">
                        <strong>{active.name}</strong>
                        <span>NV. {active.level}</span>
                      </div>

                      <Type name={active.type} />
                      <Life pokemon={active} />

                      <div className="xp-progress">
                        <div style={{
                          width: `${Math.round(
                            active.xp / (active.level * 12) * 100
                          )}%`
                        }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="battle-bottom">
                <div className="log-title">
                  <span className="live-dot" />
                  DIÁRIO DE BATALHA
                </div>

                <div className="battle-log" aria-live="polite">
                  {save.messages.slice(-3).map((m, i) => (
                    <div key={i}>{m}</div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="side-panel">
              <section className="control-card">
                <div className="panel-title">
                  <span>⚔</span>
                  <div>
                    <strong>Centro de batalha</strong>
                    <small>
                      {save.screen === 'battle'
                        ? 'Escolha sua próxima ação'
                        : 'Encontro concluído'}
                    </small>
                  </div>
                </div>

                {save.screen === 'battle' ? (
                  <>
                    <div className="tabs">
                      <button
                        onClick={() => setTab('moves')}
                        className={tab === 'moves' ? 'selected' : ''}
                      >
                        ⚡ ATACAR
                      </button>

                      <button
                        onClick={() => setTab('bag')}
                        className={tab === 'bag' ? 'selected' : ''}
                      >
                        ▣ MOCHILA
                      </button>

                      <button
                        onClick={() => setTab('team')}
                        className={tab === 'team' ? 'selected' : ''}
                      >
                        ◈ TIME
                      </button>
                    </div>

                    <div className="tab-content">
                      {tab === 'moves' && (
                        <>
                          <div className="hint">
                            Escolha um movimento para atacar.
                          </div>

                          <div className="move-list">
                            {active?.moves.map((m, i) => (
                              <button
                                className="move-button"
                                key={i}
                                onClick={() => move(i)}
                              >
                                <div>
                                  <strong>{m.name}</strong>
                                  <Type name={m.type} />
                                </div>

                                <span>
                                  FORÇA {m.power} <b>➜</b>
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {tab === 'bag' && (
                        <>
                          <div className="hint">
                            Use itens com estratégia. O adversário
                            ataca depois de cada tentativa.
                          </div>

                          <button
                            className="item-button"
                            onClick={throwBall}
                            disabled={!save.balls}
                          >
                            <div className="item-icon ball-icon">◉</div>
                            <div>
                              <strong>Pokébola</strong>
                              <small>
                                Capture um Pokémon enfraquecido
                              </small>
                            </div>
                            <span>×{save.balls}</span>
                          </button>

                          <button
                            className="item-button"
                            onClick={usePotion}
                            disabled={
                              !save.potions ||
                              !active ||
                              active.hp === active.maxHp
                            }
                          >
                            <div className="item-icon potion-icon">✚</div>
                            <div>
                              <strong>Poção</strong>
                              <small>Recupera até 45 HP</small>
                            </div>
                            <span>×{save.potions}</span>
                          </button>
                        </>
                      )}

                      {tab === 'team' && (
                        <>
                          <div className="hint">
                            Trocar de Pokémon consome um turno.
                          </div>

                          <div className="switch-list">
                            {save.team.map(p => (
                              <button
                                key={p.uid}
                                className={
                                  p.uid === save.activeUid
                                    ? 'is-active'
                                    : ''
                                }
                                onClick={() => switchTo(p.uid)}
                                disabled={
                                  p.hp === 0 ||
                                  p.uid === save.activeUid
                                }
                              >
                                <Picture pokemon={p} />

                                <div>
                                  <strong>{p.name}</strong>
                                  <small>
                                    NV. {p.level} • {p.hp}/{p.maxHp} HP
                                  </small>
                                </div>

                                <span>
                                  {p.uid === save.activeUid
                                    ? 'EM CAMPO'
                                    : p.hp === 0 ? 'KO' : 'TROCAR'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : save.screen === 'reward' ? (
                  <div className="results">
                    <div className="result-icon">★</div>
                    <h2>Boa jogada!</h2>
                    <p>
                      Encontro concluído. Prepare seu time
                      para a próxima rota.
                    </p>
                    <button className="primary-button" onClick={next}>
                      PRÓXIMO ENCONTRO <span>➜</span>
                    </button>
                  </div>
                ) : (
                  <div className="results">
                    <div className="result-icon red">✕</div>
                    <h2>Fim de jogo!</h2>
                    <p>
                      Seu time desmaiou. Você venceu {save.wins}
                      {' '}batalha(s) e capturou {save.catches} Pokémon.
                    </p>
                    <button className="primary-button" onClick={reset}>
                      NOVA AVENTURA <span>↻</span>
                    </button>
                  </div>
                )}
              </section>

              <section className="team-card">
                <div className="section-heading">
                  <strong>MEU TIME</strong>
                  <span>{save.team.length}/6 POKÉMON</span>
                </div>

                <div className="team-grid">
                  {Array.from({ length: 6 }, (_, i) => {
                    const p = save.team[i];

                    return (
                      <div
                        className={`team-tile ${
                          p?.uid === save.activeUid ? 'active' : ''
                        } ${p?.hp === 0 ? 'fainted' : ''}`}
                        key={i}
                      >
                        {p ? (
                          <>
                            <Picture pokemon={p} />
                            <small>{p.name}</small>
                            <div className="tiny-life">
                              <div style={{
                                width: `${p.hp / p.maxHp * 100}%`
                              }} />
                            </div>
                          </>
                        ) : (
                          <span className="empty-team">+</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="team-hint">
                  Dica: enfraqueça um Pokémon para facilitar a captura.
                </div>
              </section>
            </aside>
          </div>

          <footer className="footer">
            <span>
              ⚡ POKÉMON ARENA — UM PROJETO FEITO COM REACT
            </span>
            <span>
              Salvamento local automático • Fan game não oficial
            </span>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
