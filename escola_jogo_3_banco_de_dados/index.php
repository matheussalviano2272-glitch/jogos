<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1b1360">
  <title>Quiz Escolar • Feira de Ciências</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧪</text></svg>">
  <link rel="stylesheet" href="style.css">
</head>
<body data-page="quiz">
  <canvas id="fx" aria-hidden="true"></canvas>

  <main class="app">

    <!-- ===================== TELA INICIAL ===================== -->
    <section id="tela-inicio" class="tela ativa" aria-labelledby="titulo-inicio">
      <div class="inicio-grid">

        <div class="vidro painel-inicio">
          <div class="marca">
            <svg class="logo" viewBox="0 0 120 120" role="img" aria-label="Logo do Quiz Escolar">
              <defs>
                <linearGradient id="gLogo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#7c4dff"/>
                  <stop offset="1" stop-color="#00c2ff"/>
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="56" fill="url(#gLogo)"/>
              <g class="orbitas" fill="none" stroke="#fff" stroke-width="4" opacity=".95">
                <ellipse cx="60" cy="60" rx="38" ry="15"/>
                <ellipse cx="60" cy="60" rx="38" ry="15" transform="rotate(60 60 60)"/>
                <ellipse cx="60" cy="60" rx="38" ry="15" transform="rotate(120 60 60)"/>
              </g>
              <circle cx="60" cy="60" r="7" fill="#ffc83d"/>
            </svg>
            <h1 id="titulo-inicio">QUIZ ESCOLAR</h1>
            <p class="sub">Competição de Conhecimentos Gerais</p>
            <span class="modo">🎯 Conhecimentos Gerais</span>
          </div>

          <form id="form-inicio" class="form" novalidate autocomplete="off">
            <label class="campo">
              <span>Nome do aluno</span>
              <input id="nome" name="nome" type="text" maxlength="30" placeholder="Digite seu nome" required>
            </label>

            <fieldset class="grupo">
              <legend>Equipe</legend>
              <div class="opcoes tres">
                <label><input type="radio" name="equipe" value="azul"><span class="opcao equipe-azul">🔵 Azul</span></label>
                <label><input type="radio" name="equipe" value="verde"><span class="opcao equipe-verde">🟢 Verde</span></label>
                <label><input type="radio" name="equipe" value="vermelha"><span class="opcao equipe-vermelha">🔴 Vermelha</span></label>
              </div>
            </fieldset>

            <fieldset class="grupo">
              <legend>Nível</legend>
              <div class="opcoes dois">
                <label><input type="radio" name="nivel" value="fundamental"><span class="opcao">🎓 Ensino Fundamental</span></label>
                <label><input type="radio" name="nivel" value="medio"><span class="opcao">🎓 Ensino Médio</span></label>
              </div>
            </fieldset>

            <p id="aviso-config" class="aviso" role="status" hidden></p>
            <p id="erro-form" class="erro-form" role="alert"></p>
            <button id="btn-iniciar" class="btn btn-principal" type="submit">🚀 INICIAR COMPETIÇÃO</button>
            <p id="resumo-config" class="resumo-config"></p>
          </form>
        </div>

        <aside class="vidro painel-ranking" aria-labelledby="titulo-ranking">
          <h2 id="titulo-ranking">🏆 Ranking dos melhores</h2>
          <div id="ranking-inicio" class="tabela-wrap"></div>
        </aside>
      </div>

      <nav class="links-rodape" aria-label="Outras páginas">
        <a href="placar.html" target="_blank" rel="noopener">Placar oficial</a>
        <a href="professor.html" target="_blank" rel="noopener">Painel do professor</a>
      </nav>
    </section>

    <!-- ===================== QUIZ ===================== -->
    <section id="tela-quiz" class="tela" aria-label="Quiz em andamento">
      <header class="vidro quiz-topo">
        <div class="jogador" id="q-jogador">
          <span class="ponto-equipe" id="q-equipe-ponto"></span>
          <div>
            <strong id="q-nome"></strong>
            <small id="q-info"></small>
          </div>
        </div>
        <div class="placar-mini">
          <span>Pontuação</span>
          <strong id="q-pontos">0</strong>
        </div>
        <div class="timer" id="q-timer" role="timer" aria-label="Tempo restante">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle class="trilho" cx="50" cy="50" r="42" pathLength="100"/>
            <circle class="prog" id="q-timer-prog" cx="50" cy="50" r="42" pathLength="100"/>
          </svg>
          <strong id="q-timer-num">30</strong>
        </div>
      </header>

      <div class="progresso-wrap">
        <div class="progresso-texto">
          <span id="q-progresso-txt">Questão 1 de 10</span>
          <span id="q-materia" class="tag-materia"></span>
        </div>
        <div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="q-barra-wrap"><i id="q-barra"></i></div>
      </div>

      <article class="vidro questao" id="q-card">
        <h2 id="q-pergunta"></h2>
        <div class="alternativas" id="q-alternativas"></div>
        <p class="feedback" id="q-feedback" aria-live="polite"></p>
      </article>
    </section>

    <!-- ===================== RESULTADO ===================== -->
    <section id="tela-resultado" class="tela" aria-label="Resultado final">
      <div class="resultado-grid">
        <div class="vidro resultado-card">
          <div class="trofeu" id="r-trofeu">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="gTrofeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style="stop-color:var(--t1)"/>
                  <stop offset="1" style="stop-color:var(--t2)"/>
                </linearGradient>
              </defs>
              <path d="M36 18h48v30a24 24 0 0 1-48 0z" fill="url(#gTrofeu)"/>
              <path d="M36 26H20v8a18 18 0 0 0 18 18M84 26h16v8a18 18 0 0 1-18 18" fill="none" stroke="url(#gTrofeu)" stroke-width="7" stroke-linecap="round"/>
              <rect x="54" y="70" width="12" height="18" fill="url(#gTrofeu)"/>
              <path d="M40 96h40l-6-8H46z" fill="url(#gTrofeu)"/>
              <rect x="34" y="96" width="52" height="11" rx="3" fill="url(#gTrofeu)"/>
              <path d="M60 26l3.5 7 7.5 1-5.5 5.2 1.4 7.5L60 43l-6.9 3.7 1.4-7.5L49 34l7.5-1z" fill="#fff" opacity=".85"/>
            </svg>
          </div>
          <div class="medalha" id="r-medalha"></div>
          <h2 id="r-nome"></h2>
          <p class="equipe-linha" id="r-equipe"></p>

          <div class="stats">
            <div class="stat"><span>Pontuação</span><strong id="r-pontos">0</strong></div>
            <div class="stat"><span>Acertos</span><strong id="r-acertos">0</strong></div>
            <div class="stat"><span>Erros</span><strong id="r-erros">0</strong></div>
            <div class="stat"><span>Tempo gasto</span><strong id="r-tempo">0:00</strong></div>
            <div class="stat"><span>Percentual</span><strong id="r-percentual">0%</strong></div>
            <div class="stat"><span>Posição no ranking</span><strong id="r-posicao">-</strong></div>
          </div>
          <p class="aviso-final" id="r-aviso" hidden></p>

          <div class="acoes">
            <button type="button" class="btn btn-principal" id="btn-novamente">🔄 Jogar novamente</button>
          </div>
        </div>

        <aside class="vidro painel-ranking" aria-labelledby="titulo-ranking-final">
          <h2 id="titulo-ranking-final">🏆 Ranking dos melhores</h2>
          <div id="r-ranking" class="tabela-wrap"></div>
        </aside>
      </div>
    </section>
  </main>

  <!-- Sobreposição usada quando o professor pausa a competição -->
  <div id="overlay" class="overlay" hidden>
    <div class="vidro overlay-card" role="alertdialog" aria-labelledby="ov-titulo">
      <div class="overlay-icone" id="ov-icone">⏸</div>
      <h2 id="ov-titulo"></h2>
      <p id="ov-texto"></p>
    </div>
  </div>

  <script src="perguntas.js"></script>
  <script src="ranking.js"></script>
  <script src="script.js"></script>
</body>
</html>
