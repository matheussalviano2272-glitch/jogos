/* ============================================================================
   script.js — Quiz (index.html)

   Fluxo: tela inicial → partida (10 questões misturadas, 30 s cada) → resultado.
   Depende de: perguntas.js (sorteio) e ranking.js (Store, utilitários).

   [INTEGRAÇÃO PHP/MySQL] Os pontos de ligação com o servidor estão marcados
   neste arquivo e em ranking.js:
     - iniciarPartida():  Perguntas.sortear() passará a vir de api/perguntas.php
     - salvarSessao():    Store.salvarSessao() → api/sessoes.php (acompanhamento ao vivo)
     - finalizar():       Store.addResultado() → api/ranking.php (grava o resultado final)
   A conferência da resposta certa deve migrar para o servidor (PHP) se for
   necessário impedir trapaças; aqui, por ser uma feira local, ela fica no navegador.
   ========================================================================== */
'use strict';


const MATERIAS = {
  matematica: { nome: 'Matemática', emoji: '🧮', cor: '#4dabf7' },
  portugues: { nome: 'Português', emoji: '📖', cor: '#ff8fab' },
  ciencias: { nome: 'Ciências', emoji: '🔬', cor: '#63e6be' },
  historia: { nome: 'História', emoji: '🏛️', cor: '#ffd43b' },
  geografia: { nome: 'Geografia', emoji: '🌍', cor: '#b197fc' }
};



const PONTOS_POR_ACERTO = 10;
const ATRASO_ACERTO_MS = 1600;   // tempo mostrando o acerto antes de avançar
const ATRASO_ERRO_MS = 2600;     // erro fica mais tempo na tela para mostrar a resposta certa

/* ---------------------------------------------------------------------------
   Estado da partida
   --------------------------------------------------------------------------- */
const Jogo = {
  ativo: false, pausado: false, respondida: false,
  dados: null, perguntas: [], indice: 0,
  pontos: 0, acertos: 0, erros: 0,
  limiteMs: 30000, restanteMs: 30000, tempoTotalMs: 0, ultimoTick: 0,
  sessaoId: null, timerId: null, pingId: null, avancarId: null
};

function mostrarTela(id) {
  $$('.tela').forEach(t => t.classList.toggle('ativa', t.id === id));
  window.scrollTo({ top: 0 });
}

function medalhaPorPercentual(p) {
  if (p <= 30) return { emoji: '🥉', nome: 'Iniciante', trofeu: 'bronze' };
  if (p <= 60) return { emoji: '🥈', nome: 'Aprendiz', trofeu: 'prata' };
  if (p <= 80) return { emoji: '🥇', nome: 'Avançado', trofeu: 'ouro' };
  return { emoji: '🏆', nome: 'Especialista', trofeu: 'ouro' };
}

/* ---------------------------------------------------------------------------
   Efeitos visuais: partículas de acerto e confetes
   --------------------------------------------------------------------------- */
const FX = (() => {
  const tela = $('#fx');
  const ctx = tela.getContext('2d');
  let particulas = [];
  let rodando = false;
  let emissor = null;

  function ajustar() { tela.width = window.innerWidth; tela.height = window.innerHeight; }
  window.addEventListener('resize', ajustar);
  ajustar();

  function quadro() {
    ctx.clearRect(0, 0, tela.width, tela.height);
    particulas = particulas.filter(p => p.vida > 0 && p.y < tela.height + 40);
    for (const p of particulas) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= p.atrito;
      if (p.tipo === 'ponto') {
        p.vida -= p.dec;
        ctx.globalAlpha = Math.max(0, p.vida);
        ctx.fillStyle = p.cor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        p.rot += p.vr;
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
    if (particulas.length || emissor) requestAnimationFrame(quadro);
    else { rodando = false; ctx.clearRect(0, 0, tela.width, tela.height); }
  }
  function acordar() { if (!rodando) { rodando = true; requestAnimationFrame(quadro); } }
  const sortear = lista => lista[Math.floor(Math.random() * lista.length)];

  return {
    /* Explosão de partículas verdes num ponto da tela (acerto). */
    explosao(x, y) {
      if (movimentoReduzido()) return;
      const cores = ['#2ee59d', '#b9ffe4', '#ffc83d', '#ffffff', '#7cf3c6'];
      for (let i = 0; i < 46; i++) {
        const ang = Math.random() * Math.PI * 2;
        const vel = 2 + Math.random() * 6.5;
        particulas.push({
          tipo: 'ponto', x, y, vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel - 2.5,
          g: .16, atrito: .98, vida: 1, dec: .014 + Math.random() * .014, r: 2 + Math.random() * 3.5, cor: sortear(cores)
        });
      }
      acordar();
    },

    /* Chuva de confetes + canhões laterais (resultado final). */
    confetes(duracaoMs) {
      if (movimentoReduzido()) return;
      const cores = ['#ffc83d', '#ff5d6c', '#2ee59d', '#4dabf7', '#b197fc', '#ffffff'];
      const peca = extra => Object.assign({
        tipo: 'papel', g: .05, atrito: .995, vida: 1, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
        w: 6 + Math.random() * 7, h: 9 + Math.random() * 9, cor: sortear(cores)
      }, extra);
      for (let i = 0; i < 90; i++) {
        const esquerda = i % 2 === 0;
        particulas.push(peca({
          x: esquerda ? 0 : tela.width, y: tela.height * .75,
          vx: (esquerda ? 1 : -1) * (4 + Math.random() * 9), vy: -(9 + Math.random() * 11)
        }));
      }
      const fim = performance.now() + duracaoMs;
      clearInterval(emissor);
      emissor = setInterval(() => {
        if (performance.now() > fim) { clearInterval(emissor); emissor = null; return; }
        for (let i = 0; i < 7; i++) particulas.push(peca({ x: Math.random() * tela.width, y: -20, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 3 }));
      }, 120);
      acordar();
    }
  };
})();

/* ---------------------------------------------------------------------------
   Tela inicial
   --------------------------------------------------------------------------- */
function atualizarInicio() {
  const cfg = Store.getConfig();
  const niveis = $$('input[name="nivel"]');

  // Se o professor fixou o nível, o aluno não pode trocar.
  if (cfg.nivel === 'livre') {
    niveis.forEach(r => { r.disabled = false; });
  } else {
    niveis.forEach(r => { r.checked = r.value === cfg.nivel; r.disabled = r.value !== cfg.nivel; });
  }

  const aviso = $('#aviso-config');
  const mensagens = {
    pausada: '⏸ Competição pausada pelo professor. Aguarde a liberação para começar.',
    encerrada: '🔒 Competição encerrada pelo professor.'
  };
  aviso.hidden = cfg.status === 'ativa';
  aviso.textContent = mensagens[cfg.status] || '';
  $('#btn-iniciar').disabled = cfg.status !== 'ativa';
  $('#resumo-config').textContent = `${cfg.qtd} questões · ${cfg.tempo} segundos por questão · +${PONTOS_POR_ACERTO} pontos por acerto`;

  $('#ranking-inicio').innerHTML = tabelaRanking(Ranking.top(10));
}

function mostrarErroForm(mensagem, campo) {
  $('#erro-form').textContent = mensagem;
  if (campo) campo.focus();
}

function aoEnviarFormulario(ev) {
  ev.preventDefault();
  if (Store.getConfig().status !== 'ativa') { atualizarInicio(); return; }

  const nome = $('#nome').value.trim().replace(/\s+/g, ' ');
  const equipe = ($('input[name="equipe"]:checked') || {}).value;
  const nivel = ($('input[name="nivel"]:checked') || {}).value;

  if (nome.length < 2) return mostrarErroForm('Digite o seu nome (mínimo de 2 letras).', $('#nome'));
  if (!equipe) return mostrarErroForm('Escolha a sua equipe.');
  if (!nivel) return mostrarErroForm('Escolha o nível de ensino.');
  mostrarErroForm('');
  iniciarPartida({ nome, equipe, nivel });
}

/* ---------------------------------------------------------------------------
   Partida
   --------------------------------------------------------------------------- */
async function iniciarPartida(dados) {
  const cfg = Store.getConfig();

  let perguntas = [];

  try {
    const resposta = await fetch(`api_perguntas.php?nivel=${dados.nivel}`);
    perguntas = await resposta.json();
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar perguntas do banco de dados.');
    return;
  }

  if (!perguntas || perguntas.length === 0) {
    alert('Nenhuma pergunta encontrada para este nível.');
    return;
  }

  Object.assign(Jogo, {
    ativo: true,
    pausado: false,
    respondida: false,
    dados,
    perguntas,
    indice: 0,
    pontos: 0,
    acertos: 0,
    erros: 0,
    limiteMs: cfg.tempo * 1000,
    restanteMs: cfg.tempo * 1000,
    tempoTotalMs: 0,
    sessaoId: idUnico()
  });

  const equipe = EQUIPES[dados.equipe];
  $('#q-nome').textContent = dados.nome;
  $('#q-info').textContent = `Equipe ${equipe.nome} · ${NIVEIS[dados.nivel]}`;
  $('#q-jogador').className = 'jogador equipe-' + dados.equipe;
  $('#q-pontos').textContent = '0';
  $('#q-pontos').dataset.valor = 0;

  salvarSessao('jogando');
  clearInterval(Jogo.pingId);
  Jogo.pingId = setInterval(() => salvarSessao('jogando'), 5000);

  mostrarTela('tela-quiz');
  mostrarQuestao();
}

function salvarSessao(status) {
  if (!Jogo.sessaoId) return;
  // [INTEGRAÇÃO PHP/MySQL] Store.salvarSessao() vira um POST para api/sessoes.php
  Store.salvarSessao({
    id: Jogo.sessaoId, nome: Jogo.dados.nome, equipe: Jogo.dados.equipe, nivel: Jogo.dados.nivel,
    pontos: Jogo.pontos, acertos: Jogo.acertos, respondidas: Jogo.acertos + Jogo.erros,
    total: Jogo.perguntas.length, tempo: Math.round(Jogo.tempoTotalMs / 1000), status, ping: Date.now()
  });
}

function mostrarQuestao() {
  const p = Jogo.perguntas[Jogo.indice];
  const total = Jogo.perguntas.length;
  const chaveMateria = String(p.materia || '').trim().toLowerCase();
  const materia = MATERIAS[chaveMateria] || { nome: 'Conhecimentos Gerais', emoji: '📚', cor: '#4dabf7' };
  Jogo.respondida = false;

  const card = $('#q-card');
  card.classList.remove('sucesso', 'tremer', 'troca');
  void card.offsetWidth;          // reinicia a animação de entrada
  card.classList.add('troca');

  $('#q-progresso-txt').textContent = `Questão ${Jogo.indice + 1} de ${total}`;
  $('#q-barra').style.width = (Jogo.indice / total * 100) + '%';
  $('#q-barra-wrap').setAttribute('aria-valuenow', Math.round(Jogo.indice / total * 100));
  const tag = $('#q-materia');
  tag.textContent = `${materia?.emoji || '📚'} ${materia?.nome || 'Conhecimentos Gerais'}`;
  tag.style.setProperty('--mat', materia.cor);

  $('#q-pergunta').textContent = p.pergunta;
  $('#q-feedback').textContent = '';
  $('#q-feedback').className = 'feedback';

  const caixa = $('#q-alternativas');
  caixa.innerHTML = '';
  p.alternativas.forEach((texto, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'alt';
    b.innerHTML = `<span class="letra">${'ABCD'[i]}</span><span class="texto"></span>`;
    b.querySelector('.texto').textContent = texto;
    b.addEventListener('click', () => responder(i));
    caixa.appendChild(b);
  });

  Jogo.restanteMs = Jogo.limiteMs;
  atualizarTimer();
  Jogo.ultimoTick = performance.now();
  clearInterval(Jogo.timerId);
  Jogo.timerId = setInterval(tick, 100);
}

/* Cronômetro: mede tempo real (não depende da frequência do setInterval). */
function tick() {
  const agora = performance.now();
  const delta = agora - Jogo.ultimoTick;
  Jogo.ultimoTick = agora;
  if (!Jogo.ativo || Jogo.pausado || Jogo.respondida) return;
  Jogo.restanteMs -= delta;
  Jogo.tempoTotalMs += delta;
  atualizarTimer();
  if (Jogo.restanteMs <= 0) responder(-1);   // tempo esgotado = errada
}

function atualizarTimer() {
  const restante = Math.max(0, Jogo.restanteMs);
  const fracao = restante / Jogo.limiteMs;
  const timer = $('#q-timer');
  $('#q-timer-num').textContent = Math.ceil(restante / 1000);
  $('#q-timer-prog').style.strokeDashoffset = 100 * (1 - fracao);
  timer.classList.toggle('alerta', fracao <= .34 && fracao > .17);
  timer.classList.toggle('critico', fracao <= .17);
}

function responder(indice) {
  if (!Jogo.ativo || Jogo.respondida) return;
  Jogo.respondida = true;
  clearInterval(Jogo.timerId);

  const p = Jogo.perguntas[Jogo.indice];
  console.log("Pergunta atual:", p);
console.log("Matéria:", p.materia);
  const total = Jogo.perguntas.length;
  const botoes = $$('#q-alternativas .alt');
  const acertou = indice === p.correta;
  const card = $('#q-card');
  const feedback = $('#q-feedback');

  botoes.forEach(b => { b.disabled = true; b.classList.add('desativada'); });
  botoes[p.correta].classList.replace('desativada', 'certa');
  $('#q-barra').style.width = ((Jogo.indice + 1) / total * 100) + '%';

  if (acertou) {
    Jogo.acertos++;
    Jogo.pontos += PONTOS_POR_ACERTO;
    const r = botoes[indice].getBoundingClientRect();
    FX.explosao(r.left + r.width / 2, r.top + r.height / 2);
    card.classList.add('sucesso');
    const elogios = ['Isso mesmo! 🎉', 'Mandou bem! ⭐', 'Resposta certa! ✅', 'Perfeito! 🚀'];
    feedback.textContent = `${elogios[Math.floor(Math.random() * elogios.length)]} +${PONTOS_POR_ACERTO} pontos`;
    feedback.className = 'feedback ok';
    const pontos = $('#q-pontos');
    animarNumero(pontos, Jogo.pontos, { dur: 600 });
    pontos.classList.remove('pop'); void pontos.offsetWidth; pontos.classList.add('pop');
  } else {
    Jogo.erros++;
    if (indice >= 0) {
      botoes[indice].classList.replace('desativada', 'errada');
    }
    card.classList.add('tremer');
    const letra = 'ABCD'[p.correta];
    feedback.textContent = (indice < 0 ? '⏰ Tempo esgotado! ' : '❌ Não foi dessa vez. ') + `A resposta certa é a ${letra}.`;
    feedback.className = 'feedback erro';
  }

  salvarSessao('jogando');
  clearTimeout(Jogo.avancarId);
  Jogo.avancarId = setTimeout(proxima, acertou ? ATRASO_ACERTO_MS : ATRASO_ERRO_MS);
}

function proxima() {
  if (!Jogo.ativo) return;
  Jogo.indice++;
  if (Jogo.indice >= Jogo.perguntas.length) finalizar('completa');
  else mostrarQuestao();
}

/* ---------------------------------------------------------------------------
   Resultado final
   --------------------------------------------------------------------------- */
function finalizar(motivo) {
  if (!Jogo.ativo) return;
  Jogo.ativo = false;
  clearInterval(Jogo.timerId);
  clearInterval(Jogo.pingId);
  clearTimeout(Jogo.avancarId);
  esconderOverlay();

  const total = Jogo.perguntas.length;
  Jogo.erros = total - Jogo.acertos;   // questões não respondidas (competição encerrada) contam como erro
  const resultado = {
    id: Jogo.sessaoId, nome: Jogo.dados.nome, equipe: Jogo.dados.equipe, nivel: Jogo.dados.nivel,
    pontos: Jogo.pontos, acertos: Jogo.acertos, erros: Jogo.erros, total,
    tempo: Math.round(Jogo.tempoTotalMs / 1000), percentual: Math.round(Jogo.acertos / total * 100),
    data: new Date().toISOString()
  };

  salvarSessao('finalizado');
  // [INTEGRAÇÃO PHP/MySQL] Store.addResultado() vira um POST para api/ranking.php (INSERT INTO resultados).
  Store.addResultado(resultado);
  fetch('api_salva-resultado.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(resultado)}).catch(console.error);
  mostrarResultado(resultado, motivo);
}

function mostrarResultado(r, motivo) {
  const medalha = medalhaPorPercentual(r.percentual);
  const equipe = EQUIPES[r.equipe];

  $('#r-trofeu').className = 'trofeu ' + medalha.trofeu;
  $('#r-medalha').textContent = `${medalha.emoji} ${medalha.nome}`;
  $('#r-nome').textContent = r.nome;
  $('#r-equipe').textContent = `${equipe.emoji} Equipe ${equipe.nome} · ${NIVEIS[r.nivel]}`;
  $('#r-pontos').textContent = r.pontos;
  $('#r-acertos').textContent = r.acertos;
  $('#r-erros').textContent = r.erros;
  $('#r-tempo').textContent = fmtTempo(r.tempo);
  $('#r-percentual').textContent = r.percentual + '%';
  const pos = Ranking.posicao(r.id);
  $('#r-posicao').textContent = pos ? pos + 'º' : '-';

  const aviso = $('#r-aviso');
  aviso.hidden = motivo !== 'encerrada';
  aviso.textContent = 'A competição foi encerrada pelo professor. As questões restantes contaram como erro.';

  $('#r-ranking').innerHTML = tabelaRanking(Ranking.top(10), r.id);
  mostrarTela('tela-resultado');
  FX.confetes(r.percentual > 60 ? 6500 : 3500);
}

function jogarNovamente() {
  $('#form-inicio').reset();
  mostrarErroForm('');
  atualizarInicio();
  mostrarTela('tela-inicio');
  $('#nome').focus();
}

/* ---------------------------------------------------------------------------
   Controle do professor (pausar / encerrar) e sobreposição
   --------------------------------------------------------------------------- */
function mostrarOverlay(icone, titulo, texto) {
  $('#ov-icone').textContent = icone;
  $('#ov-titulo').textContent = titulo;
  $('#ov-texto').textContent = texto;
  $('#overlay').hidden = false;
}
function esconderOverlay() { $('#overlay').hidden = true; }

function aoMudarDados() {
  atualizarInicio();
  if (!Jogo.ativo) return;

  const status = Store.getConfig().status;
  if (status === 'pausada') {
    Jogo.pausado = true;
    mostrarOverlay('⏸', 'Competição pausada', 'O professor pausou a competição. O cronômetro está parado e volta assim que ela for retomada.');
  } else if (status === 'ativa') {
    if (Jogo.pausado) Jogo.ultimoTick = performance.now();
    Jogo.pausado = false;
    esconderOverlay();
  } else if (status === 'encerrada') {
    finalizar('encerrada');
  }
}

/* ---------------------------------------------------------------------------
   Inicialização
   --------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  $('#form-inicio').addEventListener('submit', aoEnviarFormulario);
  $('#btn-novamente').addEventListener('click', jogarNovamente);
  $$('#form-inicio input').forEach(i => i.addEventListener('input', () => mostrarErroForm('')));

  // Atalhos de teclado durante a partida: A, B, C, D ou 1, 2, 3, 4
  document.addEventListener('keydown', ev => {
    if (!Jogo.ativo || Jogo.pausado || Jogo.respondida || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (!$('#tela-quiz').classList.contains('ativa')) return;
    const mapa = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
    const i = mapa[ev.key.toLowerCase()];
    if (i !== undefined && i < Jogo.perguntas[Jogo.indice].alternativas.length) responder(i);
  });

  // Se o aluno fechar a aba no meio da partida, o painel do professor mostra "Abandonou".
  window.addEventListener('pagehide', () => { if (Jogo.ativo) salvarSessao('abandonou'); });

  Store.onChange(aoMudarDados);
  atualizarInicio();
});
