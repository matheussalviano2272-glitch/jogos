/* ============================================================================
   professor.js — Painel do professor (professor.html)

   Controla a competição (iniciar, pausar, encerrar, limpar), a configuração
   das próximas partidas e o monitoramento dos alunos.

   [INTEGRAÇÃO PHP/MySQL]
     - Todas as ações abaixo passam por Store.setConfig() / Store.limparRanking(),
       que hoje gravam no LocalStorage. Com servidor, viram chamadas a
       api/config.php e api/ranking.php (DELETE) e exigem professor autenticado.
     - O painel se atualiza a cada 2 s (renderizarPainel). Com servidor, o mesmo
       intervalo passa a buscar os dados em api/ranking.php e api/sessoes.php.
   ========================================================================== */
'use strict';

const ROTULOS_ESTADO = {
  ativa:     ['ativa', '🟢 Competição ativa'],
  pausada:   ['pausada', '🟠 Competição pausada'],
  encerrada: ['encerrada', '🔴 Competição encerrada']
};

const ROTULOS_STATUS = {
  jogando:      ['jogando', '🟢 Jogando'],
  pausado:      ['pausado', '🟠 Pausado'],
  finalizado:   ['finalizado', '✅ Finalizado'],
  abandonou:    ['', '⚪ Abandonou'],
  desconectado: ['', '⚪ Sem sinal']
};

/* Diálogo de confirmação (usa o <dialog> nativo). */
function confirmar(mensagem) {
  const dialogo = $('#confirmar');
  $('#conf-texto').textContent = mensagem;
  dialogo.returnValue = '';
  return new Promise(resolver => {
    dialogo.addEventListener('close', () => resolver(dialogo.returnValue === 'ok'), { once: true });
    dialogo.showModal();
  });
}

function statusDaSessao(sessao, cfg, agora) {
  if (sessao.status !== 'jogando') return sessao.status;
  if (agora - sessao.ping > Ranking.SESSAO_INATIVA_MS) return 'desconectado';
  return cfg.status === 'pausada' ? 'pausado' : 'jogando';
}

/* Linhas do monitoramento: sessões em andamento + resultados que vieram de importação. */
function linhasDoMonitor(cfg) {
  const agora = Date.now();
  const sessoes = Store.getSessoes();
  const conhecidos = new Set(sessoes.map(s => s.id));
  const linhas = sessoes.map(s => ({
    nome: s.nome, equipe: s.equipe, pontos: s.pontos, tempo: s.tempo,
    status: statusDaSessao(s, cfg, agora), quando: s.ping
  }));
  Store.getRanking().filter(r => !conhecidos.has(r.id)).forEach(r => linhas.push({
    nome: r.nome, equipe: r.equipe, pontos: r.pontos, tempo: r.tempo, status: 'finalizado', quando: Date.parse(r.data)
  }));

  const emAndamento = l => (l.status === 'jogando' || l.status === 'pausado') ? 0 : 1;
  return linhas.sort((a, b) => emAndamento(a) - emAndamento(b) || b.quando - a.quando).slice(0, 120);
}

function renderizarPainel() {
  const cfg = Store.getConfig();
  const r = Ranking.resumo();
  const chaves = Object.keys(EQUIPES);
  const maximo = Math.max(...chaves.map(k => r.equipes[k].pontos));

  // Cards superiores
  animarNumero($('#pc-participantes'), r.participantes);
  animarNumero($('#pc-media'), r.media, { casas: 1 });
  animarNumero($('#pc-respondidas'), r.respondidas);
  const lideres = chaves.filter(k => r.equipes[k].pontos === maximo);
  $('#pc-lider').textContent = maximo === 0 ? '—' : (lideres.length > 1 ? 'Empate' : `${EQUIPES[lideres[0]].emoji} ${EQUIPES[lideres[0]].nome}`);

  // Estado da competição e botões
  const [classe, texto] = ROTULOS_ESTADO[cfg.status];
  const pill = $('#estado-comp');
  pill.className = 'pill ' + classe;
  pill.textContent = texto;
  $('#btn-iniciar').disabled = cfg.status === 'ativa';
  $('#btn-pausar').disabled = cfg.status !== 'ativa';
  $('#btn-encerrar').disabled = cfg.status === 'encerrada';

  // Barras por equipe
  $('#barras-equipes').innerHTML = chaves.map(k => {
    const pontos = r.equipes[k].pontos;
    const largura = maximo > 0 ? (pontos / maximo) * 100 : 0;
    return `<div class="linha-barra equipe-${k}">
      <span>${EQUIPES[k].emoji} ${EQUIPES[k].nome}</span>
      <div class="barra"><i style="width:${largura}%"></i></div>
      <output>${pontos}</output></div>`;
  }).join('');

  // Tabela de monitoramento
  const linhas = linhasDoMonitor(cfg);
  $('#monitor').innerHTML = linhas.length
    ? `<table class="tabela">
        <thead><tr><th>Aluno</th><th>Equipe</th><th class="num">Pontuação</th><th class="num">Tempo</th><th>Status</th></tr></thead>
        <tbody>${linhas.map(l => {
          const [cls, rotulo] = ROTULOS_STATUS[l.status] || ['', l.status];
          return `<tr><td>${esc(l.nome)}</td><td>${tagEquipe(l.equipe)}</td><td class="num">${l.pontos}</td>
                  <td class="num">${fmtTempo(l.tempo)}</td><td><span class="status-chip ${cls}">${rotulo}</span></td></tr>`;
        }).join('')}</tbody></table>`
    : '<p class="vazio">Nenhum aluno participou ainda. Abra o quiz em qualquer notebook para começar.</p>';
}

/* Campos de configuração: só são preenchidos na abertura e quando outra aba altera,
   para não atrapalhar quem está digitando. */
function carregarCampos() {
  const cfg = Store.getConfig();
  $('#cfg-nivel').value = cfg.nivel;
  $('#cfg-qtd').value = String(cfg.qtd);
  $('#cfg-tempo').value = cfg.tempo;
}

function salvarConfig(parcial, mensagem) {
  Store.setConfig(parcial);
  toast(mensagem);
  renderizarPainel();
}

function baixarArquivo(nome, conteudo) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCampos();
  renderizarPainel();

  // Configuração
  $('#cfg-nivel').addEventListener('change', e => salvarConfig({ nivel: e.target.value }, 'Nível atualizado.'));
  $('#cfg-qtd').addEventListener('change', e => salvarConfig({ qtd: Number(e.target.value) }, 'Quantidade de questões atualizada.'));
  $('#cfg-tempo').addEventListener('change', e => {
    const valor = Math.min(120, Math.max(10, Math.round(Number(e.target.value)) || 30));
    e.target.value = valor;
    salvarConfig({ tempo: valor }, 'Tempo por questão atualizado.');
  });

  // Controle da competição
  $('#btn-iniciar').addEventListener('click', () => {
    const eraEncerrada = Store.getConfig().status === 'encerrada';
    salvarConfig({ status: 'ativa' }, eraEncerrada ? 'Nova rodada liberada para os alunos.' : 'Competição retomada.');
  });
  $('#btn-pausar').addEventListener('click', () => salvarConfig({ status: 'pausada' }, 'Competição pausada.'));
  $('#btn-encerrar').addEventListener('click', async () => {
    const ok = await confirmar('Encerrar a competição? Quem estiver jogando terá a partida finalizada agora e novos alunos não conseguirão iniciar.');
    if (ok) salvarConfig({ status: 'encerrada' }, 'Competição encerrada.');
  });
  $('#btn-limpar').addEventListener('click', async () => {
    const ok = await confirmar('Limpar todo o ranking e o monitoramento? Esta ação não pode ser desfeita.');
    if (!ok) return;
    Store.limparRanking();
    toast('Ranking limpo.');
    renderizarPainel();
  });

  // Exportar / importar
  $('#btn-exportar').addEventListener('click', () => {
    const agora = new Date();
    const carimbo = agora.toISOString().slice(0, 16).replace(/[-:T]/g, '');
    baixarArquivo(`ranking-feira-${carimbo}.json`, Store.exportar());
    toast('Ranking exportado.');
  });
  $('#btn-importar').addEventListener('click', () => $('#arquivo-importar').click());
  $('#arquivo-importar').addEventListener('change', async e => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    try {
      const novos = Store.importar(JSON.parse(await arquivo.text()));
      toast(novos ? `${novos} resultado${novos === 1 ? '' : 's'} importado${novos === 1 ? '' : 's'}.` : 'Nenhum resultado novo neste arquivo.');
    } catch (erro) {
      toast('Arquivo inválido. Use um JSON exportado por este painel.');
    }
    e.target.value = '';
    renderizarPainel();
  });

  Store.onChange(() => { carregarCampos(); renderizarPainel(); });
  setInterval(renderizarPainel, 2000);
});
