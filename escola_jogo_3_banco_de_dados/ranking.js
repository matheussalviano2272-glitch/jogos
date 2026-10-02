/* ============================================================================
   ranking.js — Dados (LocalStorage), utilitários compartilhados e Placar Oficial

   Carregado por: index.html, placar.html e professor.html.
   Todo acesso a dados passa pelo objeto `Store`. É o ÚNICO arquivo que precisa
   mudar quando o PHP/MySQL for ligado.

   ---------------------------------------------------------------------------
   [INTEGRAÇÃO PHP/MySQL] — GUIA
   ---------------------------------------------------------------------------
   Hoje cada notebook guarda os dados no LocalStorage do próprio navegador.
   Com um servidor, os 3 notebooks passam a compartilhar o mesmo banco.

   Tabelas sugeridas:
     resultados (id VARCHAR(40) PK, nome VARCHAR(30), equipe ENUM('azul','verde','vermelha'),
                 nivel ENUM('fundamental','medio'), pontos INT, acertos INT, erros INT,
                 total INT, tempo INT, percentual INT, data DATETIME)
     sessoes    (id VARCHAR(40) PK, nome, equipe, nivel, pontos INT, acertos INT,
                 respondidas INT, total INT, tempo INT, status VARCHAR(15), ping DATETIME)
     config     (chave VARCHAR(20) PK, valor VARCHAR(40))   -- nivel, qtd, tempo, status

   Endpoints sugeridos (PHP + PDO, respondendo JSON):
     GET  api/ranking.php     → Store.getRanking()
     POST api/ranking.php     → Store.addResultado()
     DELETE api/ranking.php   → Store.limparRanking()
     GET/POST api/sessoes.php → Store.getSessoes() / Store.salvarSessao()
     GET/POST api/config.php  → Store.getConfig()  / Store.setConfig()

   Como migrar: reescreva os métodos de `Store` com fetch() (tornando-os
   assíncronos) e troque o `Store.onChange` por polling (setInterval + fetch),
   como o placar já faz a cada 2 segundos. Sempre valide e use consultas
   preparadas (PDO) no PHP: nunca confie nos dados vindos do navegador.
   ========================================================================== */
'use strict';

/* ---------------------------------------------------------------------------
   Constantes e utilitários
   --------------------------------------------------------------------------- */
const EQUIPES = {
  azul:     { nome: 'Azul',     emoji: '🔵', cor: '#3b82f6' },
  verde:    { nome: 'Verde',    emoji: '🟢', cor: '#22c55e' },
  vermelha: { nome: 'Vermelha', emoji: '🔴', cor: '#ef4444' }
};
const NIVEIS = { fundamental: 'Ensino Fundamental', medio: 'Ensino Médio' };
const MEDALHAS_POS = ['🥇', '🥈', '🥉'];

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtTempo(segundos) {
  const s = Math.max(0, Math.round(segundos));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function fmtData(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '-';
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function idUnico() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function movimentoReduzido() {
  return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Contador animado: leva o número exibido até `alvo` de forma suave. */
function animarNumero(el, alvo, opcoes = {}) {
  const { dur = 900, casas = 0, sufixo = '' } = opcoes;
  const atual = parseFloat(el.dataset.valor);
  const inicio = Number.isFinite(atual) ? atual : 0;
  const formatar = v => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + sufixo;
  el.dataset.valor = alvo;
  cancelAnimationFrame(el._raf);
  if (inicio === alvo || movimentoReduzido()) { el.textContent = formatar(alvo); return; }
  const t0 = performance.now();
  const passo = agora => {
    const t = Math.min(1, (agora - t0) / dur);
    const suave = 1 - Math.pow(1 - t, 3);
    el.textContent = formatar(inicio + (alvo - inicio) * suave);
    if (t < 1) el._raf = requestAnimationFrame(passo);
  };
  el._raf = requestAnimationFrame(passo);
}

let _toastTimer = null;
function toast(mensagem) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = mensagem;
  el.classList.add('visivel');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('visivel'), 2600);
}

function tagEquipe(chave) {
  const e = EQUIPES[chave];
  if (!e) return '-';
  return `<span class="tag-equipe equipe-${chave}"><i class="ponto"></i>${e.nome}</span>`;
}

/* Tabela HTML do ranking (Nome, Equipe, Pontuação, Data). */
function tabelaRanking(lista, destaqueId) {
  if (!lista.length) return '<p class="vazio">Nenhum resultado ainda. Seja o primeiro a competir!</p>';
  const linhas = lista.map((r, i) => `
    <tr class="${r.id === destaqueId ? 'destaque' : ''}">
      <td>${MEDALHAS_POS[i] || (i + 1)}</td>
      <td>${esc(r.nome)}</td>
      <td>${tagEquipe(r.equipe)}</td>
      <td class="num">${r.pontos}</td>
      <td>${fmtData(r.data)}</td>
    </tr>`).join('');
  return `<table class="tabela">
    <thead><tr><th>#</th><th>Nome</th><th>Equipe</th><th class="num">Pontos</th><th>Data</th></tr></thead>
    <tbody>${linhas}</tbody></table>`;
}

/* ---------------------------------------------------------------------------
   Store — única porta de acesso aos dados
   --------------------------------------------------------------------------- */
const Store = (() => {
  const CH = { ranking: 'quizfeira:ranking', sessoes: 'quizfeira:sessoes', config: 'quizfeira:config' };
  const CONFIG_PADRAO = { nivel: 'livre', qtd: 10, tempo: 30, status: 'ativa' };   // status: ativa | pausada | encerrada
  const canal = ('BroadcastChannel' in window) ? new BroadcastChannel('quizfeira') : null;
  const ouvintes = [];
  const pendentes = new Set();
  let agendado = null;

  function ler(chave, padrao) {
    try {
      const bruto = localStorage.getItem(chave);
      return bruto === null ? padrao : JSON.parse(bruto);
    } catch (e) { return padrao; }
  }

  function gravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.warn('Não foi possível gravar no armazenamento local:', e);
    }
    if (canal) canal.postMessage({ chave });
  }

  // Junta avisos repetidos (storage + BroadcastChannel) numa única chamada.
  function notificar(chave) {
    pendentes.add(chave);
    clearTimeout(agendado);
    agendado = setTimeout(() => {
      const chaves = Array.from(pendentes);
      pendentes.clear();
      ouvintes.forEach(fn => fn(chaves));
    }, 40);
  }
  window.addEventListener('storage', e => { if (e.key && e.key.indexOf('quizfeira:') === 0) notificar(e.key); });
  if (canal) canal.onmessage = e => notificar(e.data && e.data.chave);

  // Valida um resultado vindo de fora (importação de arquivo ou, no futuro, da API).
  function validarResultado(r) {
    if (!r || typeof r !== 'object') return null;
    const num = v => (Number.isFinite(Number(v)) && Number(v) >= 0) ? Math.round(Number(v)) : null;
    const nome = typeof r.nome === 'string' ? r.nome.trim().slice(0, 30) : '';
    const dataOk = !isNaN(new Date(r.data));
    const campos = { pontos: num(r.pontos), acertos: num(r.acertos), erros: num(r.erros), total: num(r.total), tempo: num(r.tempo), percentual: num(r.percentual) };
    if (!nome || !EQUIPES[r.equipe] || !NIVEIS[r.nivel] || !dataOk || typeof r.id !== 'string' || !r.id) return null;
    if (Object.values(campos).some(v => v === null)) return null;
    return Object.assign({ id: r.id.slice(0, 40), nome, equipe: r.equipe, nivel: r.nivel, data: new Date(r.data).toISOString() }, campos);
  }

  return {
    CONFIG_PADRAO,
    onChange(fn) { ouvintes.push(fn); },

    // [INTEGRAÇÃO PHP/MySQL] GET api/config.php
    getConfig() { return Object.assign({}, CONFIG_PADRAO, ler(CH.config, {})); },
    // [INTEGRAÇÃO PHP/MySQL] POST api/config.php  (somente professor autenticado)
    setConfig(parcial) {
      const nova = Object.assign(this.getConfig(), parcial);
      gravar(CH.config, nova);
      return nova;
    },

    // [INTEGRAÇÃO PHP/MySQL] GET api/ranking.php
    getRanking() { return ler(CH.ranking, []); },
    // [INTEGRAÇÃO PHP/MySQL] POST api/ranking.php  → INSERT INTO resultados (...)
    addResultado(resultado) {
      const lista = this.getRanking();
      lista.push(resultado);
      gravar(CH.ranking, lista);
    },
    // [INTEGRAÇÃO PHP/MySQL] DELETE api/ranking.php  → DELETE FROM resultados / sessoes
    limparRanking() {
      gravar(CH.ranking, []);
      gravar(CH.sessoes, []);
    },

    // [INTEGRAÇÃO PHP/MySQL] GET api/sessoes.php
    getSessoes() { return ler(CH.sessoes, []); },
    // [INTEGRAÇÃO PHP/MySQL] POST api/sessoes.php  → INSERT ... ON DUPLICATE KEY UPDATE
    salvarSessao(sessao) {
      const lista = this.getSessoes();
      const i = lista.findIndex(s => s.id === sessao.id);
      if (i >= 0) lista[i] = sessao; else lista.push(sessao);
      gravar(CH.sessoes, lista.slice(-300));
    },

    /* Exportar / importar: reúne os resultados dos 3 notebooks enquanto não há servidor. */
    exportar() {
      return JSON.stringify({ versao: 1, exportadoEm: new Date().toISOString(), ranking: this.getRanking() }, null, 2);
    },
    importar(objeto) {
      if (!objeto || !Array.isArray(objeto.ranking)) throw new Error('Formato inválido');
      const lista = this.getRanking();
      const ids = new Set(lista.map(r => r.id));
      let novos = 0;
      objeto.ranking.forEach(bruto => {
        const r = validarResultado(bruto);
        if (r && !ids.has(r.id)) { lista.push(r); ids.add(r.id); novos++; }
      });
      if (novos) gravar(CH.ranking, lista);
      return novos;
    }
  };
})();

/* ---------------------------------------------------------------------------
   Ranking — consultas e estatísticas sobre os dados do Store
   --------------------------------------------------------------------------- */
const Ranking = {
  SESSAO_INATIVA_MS: 30000,   // sem sinal por 30 s = aluno saiu da partida

  ordenar(lista) {
    return lista.slice().sort((a, b) => b.pontos - a.pontos || a.tempo - b.tempo || new Date(a.data) - new Date(b.data));
  },
  top(n = 10) { return this.ordenar(Store.getRanking()).slice(0, n); },
  posicao(id) { return this.ordenar(Store.getRanking()).findIndex(r => r.id === id) + 1; },

  sessoesAtivas() {
    const agora = Date.now();
    return Store.getSessoes().filter(s => s.status === 'jogando' && agora - s.ping < this.SESSAO_INATIVA_MS);
  },

  /* Pontos por equipe = partidas concluídas + partidas em andamento (contador ao vivo). */
  resumo() {
    const concluidos = Store.getRanking();
    const jogando = this.sessoesAtivas();
    const equipes = {};
    Object.keys(EQUIPES).forEach(k => { equipes[k] = { pontos: 0, participantes: 0, acertos: 0 }; });

    concluidos.forEach(r => {
      const e = equipes[r.equipe];
      if (!e) return;
      e.pontos += r.pontos; e.participantes++; e.acertos += r.acertos;
    });
    jogando.forEach(s => {
      const e = equipes[s.equipe];
      if (!e) return;
      e.pontos += s.pontos; e.participantes++; e.acertos += s.acertos || 0;
    });

    const participantes = concluidos.length + jogando.length;
    const somaPontos = concluidos.reduce((a, r) => a + r.pontos, 0) + jogando.reduce((a, s) => a + s.pontos, 0);
    return {
      equipes,
      participantes,
      respondidas: concluidos.reduce((a, r) => a + r.acertos + r.erros, 0) + jogando.reduce((a, s) => a + s.respondidas, 0),
      maior: Math.max(0, ...concluidos.map(r => r.pontos), ...jogando.map(s => s.pontos)),
      tempoMedio: concluidos.length ? concluidos.reduce((a, r) => a + r.tempo, 0) / concluidos.length : 0,
      media: participantes ? somaPontos / participantes : 0
    };
  }
};

/* ---------------------------------------------------------------------------
   Placar oficial (placar.html)
   --------------------------------------------------------------------------- */
function reordenarCards(container, ordem) {
  const atuais = Array.from(container.children);
  if (atuais.map(c => c.dataset.equipe).join() === ordem.join()) return;
  const antes = new Map(atuais.map(c => [c, c.getBoundingClientRect()]));
  ordem.forEach(chave => container.appendChild(container.querySelector(`[data-equipe="${chave}"]`)));
  atuais.forEach(card => {
    const a = antes.get(card);
    const d = card.getBoundingClientRect();
    const dx = a.left - d.left, dy = a.top - d.top;
    if ((dx || dy) && card.animate) {
      card.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 750, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  });
}

function iniciarPlacar() {
  const container = $('#equipes');
  const chaves = Object.keys(EQUIPES);
  const rotulos = {
    ativa:     ['ativa', '🟢 Competição em andamento'],
    pausada:   ['pausada', '🟠 Competição pausada'],
    encerrada: ['encerrada', '🔴 Competição encerrada']
  };

  function renderizar() {
    const r = Ranking.resumo();
    const pts = k => r.equipes[k].pontos;
    const maximo = Math.max(...chaves.map(pts));
    const ordem = chaves.slice().sort((a, b) => pts(b) - pts(a) || chaves.indexOf(a) - chaves.indexOf(b));

    chaves.forEach(k => {
      const card = $(`[data-equipe="${k}"]`, container);
      const e = r.equipes[k];
      // Com pontos, empates dividem a colocação; sem pontos, vale a ordem fixa.
      const posicao = maximo > 0 ? 1 + chaves.filter(o => pts(o) > pts(k)).length : ordem.indexOf(k) + 1;
      card.classList.toggle('lider', maximo > 0 && pts(k) === maximo);
      $('.medalha-pos', card).textContent = MEDALHAS_POS[posicao - 1];
      $('.rotulo-pos', card).textContent = posicao + 'º lugar';
      animarNumero($('.pontos-grande', card), e.pontos, { dur: 1000 });
      $('.detalhe', card).textContent =
        `${e.participantes} participante${e.participantes === 1 ? '' : 's'} · ${e.acertos} acerto${e.acertos === 1 ? '' : 's'}`;
      $('.barra-equipe i', card).style.width = (maximo > 0 ? (e.pontos / maximo) * 100 : 0) + '%';
    });
    reordenarCards(container, ordem);

    animarNumero($('#st-participantes'), r.participantes);
    animarNumero($('#st-respondidas'), r.respondidas);
    animarNumero($('#st-maior'), r.maior);
    $('#st-tempo').textContent = fmtTempo(r.tempoMedio);

    const [classe, texto] = rotulos[Store.getConfig().status] || rotulos.ativa;
    const estado = $('#estado');
    estado.className = 'pill ' + classe;
    estado.textContent = texto;

    const top = Ranking.top(5);
    $('#top-alunos').innerHTML = top.length
      ? top.map((a, i) => `<li><span>${MEDALHAS_POS[i] || (i + 1)}</span><span>${esc(a.nome)}</span>${tagEquipe(a.equipe)}<b>${a.pontos} pts</b></li>`).join('')
      : '<li><span></span><span class="vazio">Aguardando os primeiros resultados…</span><span></span><span></span></li>';
  }

  renderizar();
  Store.onChange(renderizar);
  // [INTEGRAÇÃO PHP/MySQL] Com servidor, este intervalo passa a buscar api/ranking.php (polling).
  setInterval(renderizar, 2000);

  $('#btn-tela-cheia').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  });
}

if (document.body.dataset.page === 'placar') iniciarPlacar();
