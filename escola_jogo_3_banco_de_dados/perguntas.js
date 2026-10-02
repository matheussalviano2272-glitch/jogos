/* ============================================================================
   perguntas.js — Banco de perguntas e sorteio das partidas

   Formato de cada pergunta:  [ "enunciado", "alternativa CERTA", "errada 1", "errada 2", "errada 3" ]
   A alternativa certa é sempre a primeira no banco; o sorteio embaralha as
   alternativas a cada partida (a certa muda de letra sozinha).

   Total: 5 matérias × 30 perguntas × 2 níveis = 300 perguntas.

   [INTEGRAÇÃO PHP/MySQL]
   Hoje o banco fica neste arquivo. Para migrar:
     1. Criar as tabelas `perguntas` (id, nivel, materia, enunciado, correta,
        errada1, errada2, errada3, ativa) e importar o conteúdo abaixo.
     2. Criar api/perguntas.php?nivel=medio&qtd=10 devolvendo JSON no mesmo
        formato do retorno de Perguntas.sortear() (materia, pergunta,
        alternativas[], correta).
     3. Trocar o corpo de Perguntas.sortear() por um fetch() a essa API
        (e tornar iniciarPartida() em script.js assíncrona).
   ========================================================================== */
'use strict';

const BANCO_PERGUNTAS = {

  /* ======================= ENSINO FUNDAMENTAL ======================= */
  fundamental: {

    matematica: [
      ["Quanto é 7 × 8?", "56", "54", "48", "64"],
      ["Quanto é 144 ÷ 12?", "12", "14", "10", "11"],
      ["Quanto é 15 + 27?", "42", "41", "43", "52"],
      ["Quanto é 100 − 37?", "63", "67", "73", "57"],
      ["Qual é a metade de 90?", "45", "40", "50", "35"],
      ["Quantos lados tem um hexágono?", "6", "5", "7", "8"],
      ["Quantos graus mede um ângulo reto?", "90°", "45°", "180°", "60°"],
      ["Quanto é 5 ao quadrado (5²)?", "25", "10", "20", "15"],
      ["Qual destes números é primo?", "13", "9", "15", "21"],
      ["Quanto é 25% de 200?", "50", "25", "40", "20"],
      ["Qual é o perímetro de um quadrado de lado 5 cm?", "20 cm", "25 cm", "10 cm", "15 cm"],
      ["Qual é a área de um retângulo de 4 m por 6 m?", "24 m²", "10 m²", "20 m²", "28 m²"],
      ["Quanto é 0,5 + 0,25?", "0,75", "0,30", "0,55", "1,25"],
      ["Qual fração é equivalente a 1/2?", "2/4", "1/4", "2/3", "3/4"],
      ["Quantos minutos existem em 2 horas?", "120", "60", "90", "200"],
      ["Quanto é 9 × 9?", "81", "72", "89", "91"],
      ["Qual é o próximo número da sequência 2, 4, 6, 8, ...?", "10", "9", "12", "11"],
      ["Quanto é 1.000 ÷ 10?", "100", "10", "200", "1"],
      ["Quantas horas tem um dia?", "24", "12", "48", "60"],
      ["Quanto vale a soma dos ângulos internos de um triângulo?", "180°", "90°", "360°", "270°"],
      ["Quanto é 6 × 7?", "42", "36", "48", "49"],
      ["Quantos centímetros tem 1 metro?", "100", "10", "1.000", "50"],
      ["Qual é o maior número?", "0,99", "0,9", "0,19", "0,09"],
      ["Qual é o dobro de 35?", "70", "65", "75", "60"],
      ["Quanto é 12 + 12 + 12?", "36", "24", "32", "48"],
      ["Quantas unidades tem uma dúzia?", "12", "10", "6", "24"],
      ["Quanto é 81 ÷ 9?", "9", "8", "7", "12"],
      ["Quantos vértices tem um cubo?", "8", "6", "12", "4"],
      ["Quantos gramas tem 2 kg?", "2.000 g", "200 g", "20 g", "20.000 g"],
      ["Qual é a raiz quadrada de 49?", "7", "6", "8", "9"]
    ],

    portugues: [
      ["Qual é o sinônimo de “feliz”?", "alegre", "triste", "bravo", "cansado"],
      ["Qual é o antônimo de “grande”?", "pequeno", "enorme", "largo", "alto"],
      ["Qual é o plural de “animal”?", "animais", "animals", "animales", "animaes"],
      ["Qual palavra está escrita corretamente?", "exceção", "excessão", "esceção", "exeção"],
      ["Quantas sílabas tem a palavra “borboleta”?", "4", "3", "5", "2"],
      ["Qual destas palavras é um verbo?", "cantar", "cadeira", "azul", "feliz"],
      ["Qual é o feminino de “menino”?", "menina", "meninos", "meninão", "meninice"],
      ["Que sinal de pontuação usamos no fim de uma pergunta?", "ponto de interrogação", "ponto final", "vírgula", "ponto de exclamação"],
      ["Em “O gato preto dormiu”, qual palavra é o adjetivo?", "preto", "gato", "dormiu", "O"],
      ["Qual é o diminutivo de “casa”?", "casinha", "casal", "casaco", "casarão"],
      ["Qual palavra está acentuada corretamente?", "árvore", "arvóre", "árvorê", "arvorê"],
      ["Qual é o coletivo de “peixes”?", "cardume", "manada", "enxame", "alcateia"],
      ["Qual é o coletivo de “abelhas”?", "enxame", "cardume", "rebanho", "matilha"],
      ["Quem escreveu “O Sítio do Picapau Amarelo”?", "Monteiro Lobato", "Machado de Assis", "Ziraldo", "Clarice Lispector"],
      ["Qual é o plural de “mão”?", "mãos", "mões", "mãoes", "mães"],
      ["Qual é o plural de “cidadão”?", "cidadãos", "cidadões", "cidadães", "cidadãoes"],
      ["Complete: “Ontem eu ___ ao parque.”", "fui", "vou", "irei", "vamos"],
      ["Em “Maria comeu pão”, qual é o sujeito?", "Maria", "comeu", "pão", "Maria comeu"],
      ["Quantas letras tem o alfabeto português atual?", "26", "23", "25", "28"],
      ["Qual palavra rima com “coração”?", "canção", "caminho", "cachorro", "chuva"],
      ["Qual é o sinônimo de “rápido”?", "veloz", "lento", "calmo", "pesado"],
      ["Qual é o antônimo de “alto”?", "baixo", "grande", "forte", "magro"],
      ["Qual frase está correta?", "Nós vamos à escola.", "Nós vai à escola.", "Nós vamo à escola.", "Nós foi à escola."],
      ["Qual destas palavras é oxítona (última sílaba mais forte)?", "café", "casa", "árvore", "sábado"],
      ["Como se escreve corretamente o gesto de carinho feito com os braços?", "abraço", "abrasso", "abraso", "abrasço"],
      ["O ponto final é usado para:", "indicar o fim de uma frase", "fazer uma pergunta", "mostrar surpresa", "separar itens de uma lista"],
      ["Um poema é organizado em:", "versos e estrofes", "atos e cenas", "capítulos e parágrafos", "falas e rubricas"],
      ["Qual é o diminutivo de “livro”?", "livrinho", "livrão", "livraria", "livreiro"],
      ["Qual é o artigo na expressão “uma casa”?", "uma", "casa", "nenhum", "os"],
      ["Qual destas palavras é um substantivo?", "escola", "correr", "bonito", "rapidamente"]
    ],

    ciencias: [
      ["Qual é o planeta mais próximo do Sol?", "Mercúrio", "Vênus", "Terra", "Marte"],
      ["Qual planeta é conhecido como “planeta vermelho”?", "Marte", "Júpiter", "Saturno", "Netuno"],
      ["Qual gás os seres humanos precisam respirar para viver?", "oxigênio", "hélio", "gás carbônico", "hidrogênio"],
      ["Qual gás as plantas absorvem na fotossíntese?", "gás carbônico", "oxigênio", "nitrogênio", "hidrogênio"],
      ["Em que estado físico está a água no gelo?", "sólido", "líquido", "gasoso", "plasma"],
      ["Qual órgão bombeia o sangue pelo corpo?", "coração", "pulmão", "fígado", "estômago"],
      ["Qual órgão do sentido é responsável pela visão?", "olhos", "ouvidos", "nariz", "língua"],
      ["Quantos ossos tem, aproximadamente, um adulto?", "206", "106", "306", "150"],
      ["Qual é o satélite natural da Terra?", "Lua", "Sol", "Marte", "Vênus"],
      ["A que temperatura a água ferve ao nível do mar?", "100 °C", "50 °C", "80 °C", "120 °C"],
      ["Como se chamam os animais que se alimentam só de plantas?", "herbívoros", "carnívoros", "onívoros", "decompositores"],
      ["Qual destes animais é um mamífero?", "baleia", "tubarão", "sapo", "cobra"],
      ["Qual parte da planta absorve a água do solo?", "raiz", "folha", "flor", "fruto"],
      ["Qual é a principal fonte de luz e calor da Terra?", "Sol", "Lua", "Marte", "vento"],
      ["Como se chama a passagem da água do estado líquido para vapor?", "evaporação", "condensação", "solidificação", "fusão"],
      ["Como se chama a camada de gases que envolve a Terra?", "atmosfera", "litosfera", "hidrosfera", "biosfera"],
      ["Quantos planetas tem o Sistema Solar?", "8", "9", "7", "10"],
      ["Qual é o maior planeta do Sistema Solar?", "Júpiter", "Saturno", "Terra", "Netuno"],
      ["Qual sentido usa a língua para perceber sabores?", "paladar", "olfato", "audição", "tato"],
      ["O ímã atrai qual destes materiais?", "ferro", "madeira", "plástico", "vidro"],
      ["Qual é o maior órgão do corpo humano?", "pele", "fígado", "pulmão", "cérebro"],
      ["Qual destes animais nasce de ovo?", "galinha", "cachorro", "vaca", "gato"],
      ["Qual destes animais é um inseto?", "formiga", "aranha", "minhoca", "caracol"],
      ["Qual destes materiais é reciclável?", "vidro", "casca de banana", "borra de café", "guardanapo sujo"],
      ["Como se chama a transformação da lagarta em borboleta?", "metamorfose", "fotossíntese", "digestão", "evaporação"],
      ["Qual ser vivo produz o próprio alimento?", "planta", "cachorro", "cavalo", "ser humano"],
      ["Qual fenômeno mostra as cores da luz do Sol?", "arco-íris", "eclipse", "trovão", "maré"],
      ["Em qual estação do ano as árvores mais perdem folhas?", "outono", "primavera", "verão", "inverno"],
      ["O Sol ajuda o corpo a produzir qual vitamina?", "vitamina D", "vitamina A", "vitamina B12", "vitamina C"],
      ["Qual osso protege o cérebro?", "crânio", "fêmur", "costela", "úmero"]
    ],

    historia: [
      ["Quem chegou ao Brasil em 1500?", "Pedro Álvares Cabral", "Cristóvão Colombo", "Dom Pedro I", "Tiradentes"],
      ["Em que ano o Brasil declarou sua independência?", "1822", "1500", "1889", "1922"],
      ["Em que ano foi proclamada a República no Brasil?", "1889", "1822", "1888", "1930"],
      ["Quem proclamou a Independência do Brasil?", "Dom Pedro I", "Dom Pedro II", "Getúlio Vargas", "Tiradentes"],
      ["Em que ano foi abolida a escravidão no Brasil?", "1888", "1822", "1889", "1500"],
      ["Quem assinou a Lei Áurea?", "Princesa Isabel", "Dona Leopoldina", "Dom Pedro I", "Tiradentes"],
      ["Qual foi a primeira capital do Brasil?", "Salvador", "Rio de Janeiro", "Brasília", "São Paulo"],
      ["Em que ano Brasília foi inaugurada?", "1960", "1950", "1970", "1980"],
      ["Quais povos já viviam no Brasil antes da chegada dos portugueses?", "os indígenas", "os espanhóis", "os ingleses", "os franceses"],
      ["Qual povo antigo construiu as pirâmides do Egito?", "egípcios", "romanos", "gregos", "vikings"],
      ["Qual povo antigo criou os Jogos Olímpicos?", "gregos", "romanos", "maias", "egípcios"],
      ["Tiradentes é herói de qual movimento?", "Inconfidência Mineira", "Cabanagem", "Farroupilha", "Revolta da Chibata"],
      ["Qual povo antigo construiu o Coliseu?", "romanos", "gregos", "egípcios", "astecas"],
      ["Em que ano Cristóvão Colombo chegou à América?", "1492", "1500", "1822", "1400"],
      ["Quem foi o primeiro presidente do Brasil?", "Marechal Deodoro da Fonseca", "Getúlio Vargas", "Juscelino Kubitschek", "Dom Pedro II"],
      ["A Pré-História termina com a invenção da:", "escrita", "roda", "eletricidade", "imprensa"],
      ["Qual presidente construiu Brasília?", "Juscelino Kubitschek", "Getúlio Vargas", "Lula", "Fernando Henrique Cardoso"],
      ["Em que ano o Brasil conquistou seu primeiro título mundial de futebol?", "1958", "1950", "1962", "1970"],
      ["De qual país saíram as caravelas que chegaram ao Brasil em 1500?", "Portugal", "Espanha", "França", "Inglaterra"],
      ["Maias, astecas e incas viveram principalmente na:", "América", "Europa", "África", "Oceania"],
      ["De qual continente vieram os africanos escravizados trazidos ao Brasil?", "África", "Europa", "Ásia", "Oceania"],
      ["Em que ano começou a Primeira Guerra Mundial?", "1914", "1939", "1945", "1918"],
      ["Em que ano terminou a Segunda Guerra Mundial?", "1945", "1918", "1939", "1950"],
      ["Dom Pedro II foi:", "o segundo e último imperador do Brasil", "o primeiro presidente do Brasil", "um explorador espanhol", "um líder indígena"],
      ["A Grande Muralha foi construída em qual país?", "China", "Índia", "Japão", "Egito"],
      ["Os primeiros seres humanos fabricavam ferramentas de:", "pedra", "plástico", "aço", "vidro"],
      ["Os bandeirantes ficaram conhecidos por explorar:", "o interior do território brasileiro", "o Polo Norte", "o fundo do mar", "o continente africano"],
      ["Castelos e cavaleiros são típicos de qual período?", "Idade Média", "Pré-História", "Idade Contemporânea", "Antiguidade egípcia"],
      ["Em que ano aconteceu a Revolução Francesa?", "1789", "1500", "1822", "1914"],
      ["Qual presidente criou a CLT, as leis trabalhistas, em 1943?", "Getúlio Vargas", "Juscelino Kubitschek", "Dom Pedro II", "Deodoro da Fonseca"]
    ],

    geografia: [
      ["Qual é o maior país da América do Sul?", "Brasil", "Argentina", "Peru", "Colômbia"],
      ["Qual é a capital do Brasil?", "Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      ["Qual é o maior oceano do planeta?", "Pacífico", "Atlântico", "Índico", "Ártico"],
      ["Em qual continente fica o Brasil?", "América do Sul", "América do Norte", "África", "Europa"],
      ["Qual é o rio mais extenso do Brasil?", "Amazonas", "São Francisco", "Paraná", "Tocantins"],
      ["Quantos estados tem o Brasil, sem contar o Distrito Federal?", "26", "27", "25", "24"],
      ["Qual é a capital do estado de São Paulo?", "São Paulo", "Campinas", "Santos", "Sorocaba"],
      ["Qual é o maior bioma do Brasil?", "Amazônia", "Cerrado", "Caatinga", "Pampa"],
      ["Quantas regiões tem o Brasil?", "5", "4", "6", "7"],
      ["Em qual ponto cardeal o Sol nasce?", "leste", "oeste", "norte", "sul"],
      ["Qual linha imaginária divide a Terra em hemisfério norte e sul?", "Equador", "Trópico de Capricórnio", "Meridiano de Greenwich", "Trópico de Câncer"],
      ["Qual é o maior deserto quente do mundo?", "Saara", "Gobi", "Atacama", "Kalahari"],
      ["Qual é o continente mais populoso do mundo?", "Ásia", "África", "Europa", "América"],
      ["Qual é a capital da Argentina?", "Buenos Aires", "Santiago", "Lima", "Montevidéu"],
      ["Qual é o menor continente do mundo?", "Oceania", "Europa", "Antártida", "América do Sul"],
      ["Qual é a montanha mais alta do mundo?", "Monte Everest", "Aconcágua", "Kilimanjaro", "Mont Blanc"],
      ["Qual bioma do Nordeste brasileiro tem clima seco e vegetação de arbustos?", "Caatinga", "Pampa", "Mata Atlântica", "Pantanal"],
      ["Qual bioma é uma das maiores planícies alagáveis do mundo?", "Pantanal", "Amazônia", "Cerrado", "Pampa"],
      ["Qual é a capital de Minas Gerais?", "Belo Horizonte", "Uberlândia", "Juiz de Fora", "Ouro Preto"],
      ["Em qual estado ficam as Cataratas do Iguaçu, no lado brasileiro?", "Paraná", "Santa Catarina", "Bahia", "Mato Grosso"],
      ["Qual instrumento indica os pontos cardeais?", "bússola", "termômetro", "barômetro", "cronômetro"],
      ["Qual é o estado brasileiro mais ao sul?", "Rio Grande do Sul", "Santa Catarina", "Paraná", "São Paulo"],
      ["O estado do Amazonas fica em qual região do Brasil?", "Norte", "Sul", "Nordeste", "Sudeste"],
      ["Qual destes países NÃO faz fronteira com o Brasil?", "Chile", "Argentina", "Uruguai", "Peru"],
      ["Qual é a capital da França?", "Paris", "Londres", "Roma", "Madri"],
      ["Qual é a capital do Japão?", "Tóquio", "Pequim", "Seul", "Osaka"],
      ["Qual oceano fica entre o Brasil e a África?", "Atlântico", "Pacífico", "Índico", "Ártico"],
      ["A Terra é chamada de “planeta azul” porque:", "a maior parte da superfície é coberta por água", "o céu é sempre azul", "tem muitas florestas", "a Lua é azulada"],
      ["Qual é a capital de Portugal?", "Lisboa", "Madri", "Porto", "Paris"],
      ["Qual movimento da Terra causa o dia e a noite?", "rotação", "translação", "eclipse", "maré"]
    ]
  },

  /* ============================ ENSINO MÉDIO ============================ */
  medio: {

    matematica: [
      ["Resolva: 2x + 6 = 20. Quanto vale x?", "7", "6", "8", "10"],
      ["Quais são as raízes de x² − 9 = 0?", "3 e −3", "9 e −9", "0 e 3", "1 e −1"],
      ["Quanto vale sen 30°?", "1/2", "√3/2", "1", "√2/2"],
      ["Qual é a área de um círculo de raio 3, usando π = 3,14?", "28,26", "18,84", "9,42", "37,68"],
      ["Quanto é log₁₀ 1000?", "3", "2", "10", "100"],
      ["Quanto é 2⁵?", "32", "25", "10", "64"],
      ["Quanto é √144?", "12", "14", "11", "72"],
      ["Qual é a soma dos ângulos internos de um quadrilátero?", "360°", "180°", "270°", "540°"],
      ["Qual é a média aritmética de 4, 8 e 12?", "8", "6", "12", "10"],
      ["Quanto é 5! (5 fatorial)?", "120", "25", "60", "100"],
      ["Em um triângulo retângulo com catetos 3 e 4, quanto mede a hipotenusa?", "5", "6", "7", "12"],
      ["Qual é a razão da progressão aritmética 2, 5, 8, 11, ...?", "3", "2", "4", "5"],
      ["Se f(x) = 2x + 1, quanto vale f(3)?", "7", "6", "8", "5"],
      ["Qual é a probabilidade de sair cara ao lançar uma moeda?", "1/2", "1/3", "1/4", "1"],
      ["Qual é o valor aproximado de π?", "3,14", "2,71", "1,61", "3,41"],
      ["Qual é o volume de um cubo de aresta 3?", "27", "9", "18", "81"],
      ["Quanto é 15% de 200?", "30", "15", "20", "35"],
      ["Na equação x² − 5x + 6 = 0, qual é a soma das raízes?", "5", "6", "−5", "1"],
      ["De quantas formas 3 pessoas podem formar uma fila?", "6", "3", "9", "12"],
      ["Quanto vale 10⁰?", "1", "0", "10", "não existe"],
      ["Qual é a mediana de 3, 5, 7, 9 e 11?", "7", "5", "9", "6"],
      ["Qual é o coeficiente angular da reta y = 3x − 2?", "3", "−2", "2", "1"],
      ["Quanto vale cos 0°?", "1", "0", "−1", "1/2"],
      ["Qual é o juro simples de R$ 1.000 a 10% ao mês durante 2 meses?", "R$ 200", "R$ 100", "R$ 210", "R$ 1.200"],
      ["Qual é a área de um triângulo de base 10 e altura 6?", "30", "60", "16", "32"],
      ["Quantas diagonais tem um quadrado?", "2", "4", "1", "3"],
      ["Desenvolvendo (x + 3)², obtemos:", "x² + 6x + 9", "x² + 9", "x² + 3x + 9", "x² + 6x + 6"],
      ["Qual destes números NÃO é racional?", "√2", "1/2", "0,75", "−3"],
      ["Se 3 cadernos custam R$ 12, quanto custam 5 cadernos?", "R$ 20", "R$ 15", "R$ 18", "R$ 24"],
      ["Quanto vale 2⁻¹?", "1/2", "−2", "−1/2", "2"]
    ],

    portugues: [
      ["Quem escreveu “Dom Casmurro”?", "Machado de Assis", "José de Alencar", "Aluísio Azevedo", "Graciliano Ramos"],
      ["“Ele é uma fera” é um exemplo de qual figura de linguagem?", "metáfora", "comparação", "ironia", "hipérbole"],
      ["“Chorei rios de lágrimas” é um exemplo de:", "hipérbole", "eufemismo", "antítese", "ironia"],
      ["Quem escreveu “Vidas Secas”?", "Graciliano Ramos", "Jorge Amado", "Guimarães Rosa", "Érico Veríssimo"],
      ["Quem escreveu “O Cortiço”?", "Aluísio Azevedo", "Machado de Assis", "José de Alencar", "Lima Barreto"],
      ["Qual é o sinônimo de “efêmero”?", "passageiro", "eterno", "forte", "antigo"],
      ["Qual é o antônimo de “otimista”?", "pessimista", "esperançoso", "animado", "sonhador"],
      ["Em “Os alunos estudaram”, qual é o sujeito?", "Os alunos", "estudaram", "nós", "não há sujeito"],
      ["“Dom Casmurro” pertence a qual escola literária?", "Realismo", "Romantismo", "Barroco", "Modernismo"],
      ["Em que ano aconteceu a Semana de Arte Moderna?", "1922", "1889", "1900", "1945"],
      ["Complete: “Fui ___ escola.”", "à", "a", "á", "há"],
      ["Qual destas palavras é paroxítona (penúltima sílaba mais forte)?", "mesa", "café", "sofá", "jacaré"],
      ["Em qual classe de palavras se encaixa “rapidamente”?", "advérbio", "adjetivo", "substantivo", "verbo"],
      ["Complete: “Eu queria ir, ___ choveu.”", "mas", "mais", "más", "mais que"],
      ["Quem escreveu “Os Lusíadas”?", "Luís de Camões", "Fernando Pessoa", "Eça de Queirós", "Machado de Assis"],
      ["Quem escreveu “Capitães da Areia”?", "Jorge Amado", "Graciliano Ramos", "Clarice Lispector", "Érico Veríssimo"],
      ["Quem escreveu “A Hora da Estrela”?", "Clarice Lispector", "Cecília Meireles", "Rachel de Queiroz", "Lygia Fagundes Telles"],
      ["Quem escreveu o poema “Canção do Exílio”?", "Gonçalves Dias", "Castro Alves", "Álvares de Azevedo", "Cruz e Sousa"],
      ["“Ele tem coração de pedra” está em sentido:", "conotativo (figurado)", "denotativo (literal)", "técnico", "científico"],
      ["Complete: “Hoje ___ muitas provas.”", "há", "hão", "houveram", "haverão"],
      ["Qual é o plural de “pão”?", "pães", "pãos", "pões", "pãezes"],
      ["Qual é o coletivo de “ovelhas”?", "rebanho", "alcateia", "cardume", "enxame"],
      ["Qual gênero textual tem como objetivo informar fatos recentes?", "notícia", "poema", "fábula", "receita"],
      ["Em qual frase a vírgula está correta?", "Maria, venha aqui.", "Maria venha, aqui.", "Maria venha aqui,", "Maria, venha, aqui."],
      ["Quantas sílabas tem a palavra “cidade”?", "3", "2", "4", "5"],
      ["Em “O bolo foi feito por Ana”, a voz verbal é:", "passiva", "ativa", "reflexiva", "impessoal"],
      ["Quem escreveu “Iracema”?", "José de Alencar", "Machado de Assis", "Castro Alves", "Bernardo Guimarães"],
      ["Quem é o narrador de “Dom Casmurro”?", "Bentinho", "Capitu", "Escobar", "José Dias"],
      ["O prefixo “anti-” indica:", "oposição (contra)", "companhia", "anterioridade", "posterioridade"],
      ["Uma frase ambígua é aquela que:", "pode ter mais de um sentido", "é muito curta", "é ofensiva", "está escrita errada"]
    ],

    ciencias: [
      ["Qual é a fórmula química da água?", "H₂O", "CO₂", "O₂", "NaCl"],
      ["Qual organela realiza a fotossíntese?", "cloroplasto", "mitocôndria", "ribossomo", "núcleo"],
      ["Qual organela produz a energia da célula na respiração celular?", "mitocôndria", "cloroplasto", "lisossomo", "vacúolo"],
      ["A sigla DNA significa:", "ácido desoxirribonucleico", "ácido ribonucleico", "ácido lático", "aminoácido"],
      ["Qual é a velocidade aproximada da luz no vácuo?", "300.000 km/s", "3.000 km/s", "30.000 km/s", "340 m/s"],
      ["A Primeira Lei de Newton é conhecida como lei da:", "inércia", "ação e reação", "gravitação", "conservação da energia"],
      ["Qual é a unidade de força no Sistema Internacional?", "newton", "joule", "watt", "pascal"],
      ["Qual é a unidade de energia no Sistema Internacional?", "joule", "newton", "watt", "volt"],
      ["Qual é o símbolo químico do ouro?", "Au", "Ag", "Go", "Or"],
      ["Qual é o símbolo químico do sódio?", "Na", "S", "So", "Sd"],
      ["Qual é o pH de uma solução neutra, como a água pura?", "7", "0", "14", "1"],
      ["Qual é o valor aproximado da gravidade na Terra?", "9,8 m/s²", "1,6 m/s²", "3,7 m/s²", "24 m/s²"],
      ["Qual ácido está presente no suco gástrico do estômago?", "ácido clorídrico", "ácido sulfúrico", "ácido nítrico", "ácido acético"],
      ["Qual estrutura da célula guarda o DNA e comanda suas atividades?", "núcleo", "membrana", "ribossomo", "vacúolo"],
      ["Qual partícula do átomo tem carga negativa?", "elétron", "próton", "nêutron", "fóton"],
      ["Qual partícula do átomo tem carga positiva?", "próton", "elétron", "nêutron", "fóton"],
      ["A fotossíntese produz:", "glicose e oxigênio", "gás carbônico e água", "nitrogênio e hidrogênio", "sal e água"],
      ["As vacinas servem para:", "preparar o sistema imunológico", "curar qualquer doença", "substituir os alimentos", "aumentar a temperatura do corpo"],
      ["A Lei de Ohm é representada por:", "V = R · i", "F = m · a", "E = m · c²", "P = m · g"],
      ["Quem propôs a Teoria da Relatividade?", "Albert Einstein", "Isaac Newton", "Galileu Galilei", "Charles Darwin"],
      ["Quem propôs a teoria da evolução por seleção natural?", "Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Albert Einstein"],
      ["Quem é considerado o pai da genética, por seus estudos com ervilhas?", "Gregor Mendel", "Charles Darwin", "Louis Pasteur", "James Watson"],
      ["Qual gás é um dos principais responsáveis pelo efeito estufa?", "gás carbônico (CO₂)", "oxigênio", "hélio", "nitrogênio"],
      ["A camada de ozônio protege a Terra de:", "raios ultravioleta", "chuva ácida", "meteoros grandes", "ventos fortes"],
      ["O som NÃO se propaga:", "no vácuo", "na água", "no ar", "em metais"],
      ["Como se chama a energia de um corpo em movimento?", "cinética", "potencial", "térmica", "química"],
      ["Qual componente do sangue transporta o oxigênio?", "hemácias", "plaquetas", "leucócitos", "plasma"],
      ["Quantos cromossomos tem uma célula humana comum (não sexual)?", "46", "23", "44", "48"],
      ["Qual é a fórmula do sal de cozinha?", "NaCl", "KCl", "H₂O", "CO₂"],
      ["Na cadeia alimentar, os decompositores, como fungos e bactérias:", "decompõem a matéria orgânica", "produzem alimento por fotossíntese", "são sempre predadores", "só vivem no mar"]
    ],

    historia: [
      ["Em qual país começou a Revolução Industrial?", "Inglaterra", "França", "Alemanha", "Estados Unidos"],
      ["Qual era o lema da Revolução Francesa?", "Liberdade, Igualdade e Fraternidade", "Ordem e Progresso", "Deus, Pátria e Família", "Paz e Amor"],
      ["Em que ano começou a Segunda Guerra Mundial?", "1939", "1914", "1929", "1945"],
      ["Em que ano caiu o Muro de Berlim?", "1989", "1961", "1945", "1991"],
      ["A Guerra Fria foi uma disputa entre:", "Estados Unidos e União Soviética", "Alemanha e França", "China e Japão", "Reino Unido e Espanha"],
      ["Em que ano começou a Era Vargas?", "1930", "1889", "1945", "1964"],
      ["Em que ano começou a ditadura militar no Brasil?", "1964", "1930", "1945", "1985"],
      ["Em que ano foi promulgada a Constituição Cidadã?", "1988", "1964", "1985", "1998"],
      ["Em qual país nasceu o Renascimento?", "Itália", "Inglaterra", "Espanha", "Alemanha"],
      ["Qual destas obras foi pintada por Leonardo da Vinci?", "Mona Lisa", "O Grito", "Guernica", "A Noite Estrelada"],
      ["Quem inventou a imprensa de tipos móveis na Europa?", "Johannes Gutenberg", "Leonardo da Vinci", "Cristóvão Colombo", "Galileu Galilei"],
      ["Quem iniciou a Reforma Protestante?", "Martinho Lutero", "Napoleão Bonaparte", "Carlos Magno", "Henrique VIII"],
      ["Em que ano Vasco da Gama chegou à Índia?", "1498", "1492", "1500", "1453"],
      ["Em que ano os Estados Unidos declararam independência?", "1776", "1789", "1822", "1861"],
      ["Quem foi Napoleão Bonaparte?", "imperador da França", "rei da Inglaterra", "papa", "czar da Rússia"],
      ["Quem liderou a Alemanha nazista?", "Adolf Hitler", "Benito Mussolini", "Josef Stálin", "Francisco Franco"],
      ["O Holocausto foi:", "o extermínio de milhões de judeus pelo regime nazista", "uma batalha naval", "uma revolução operária", "um tratado de paz"],
      ["Em que ano aconteceu a Revolução Russa?", "1917", "1905", "1929", "1945"],
      ["A Grande Depressão começou com a quebra da bolsa de valores de:", "Nova York", "Londres", "Tóquio", "Paris"],
      ["O movimento “Diretas Já”, de 1984, pedia:", "eleições diretas para presidente", "o fim da escravidão", "a proclamação da República", "o voto feminino"],
      ["Na Guerra do Paraguai (1864–1870), a Tríplice Aliança enfrentou:", "o Paraguai", "o Chile", "a Bolívia", "o Peru"],
      ["Quem foi o primeiro imperador de Roma?", "Augusto", "Nero", "Constantino", "Aníbal"],
      ["No feudalismo, a base da economia era:", "a agricultura", "a indústria", "o comércio digital", "o petróleo"],
      ["Qual movimento valorizava a razão e a ciência nos séculos XVII e XVIII?", "Iluminismo", "Barroco", "Feudalismo", "Cruzadas"],
      ["Em que ano foi promulgada a Lei do Ventre Livre?", "1871", "1850", "1888", "1822"],
      ["A “política do café com leite” envolvia principalmente quais estados?", "São Paulo e Minas Gerais", "Bahia e Pernambuco", "Rio Grande do Sul e Paraná", "Pará e Amazonas"],
      ["O estopim da Primeira Guerra Mundial foi o assassinato de:", "Francisco Ferdinando", "Napoleão", "Abraham Lincoln", "Tsar Nicolau"],
      ["Quem liderou a independência da Índia com a não violência?", "Mahatma Gandhi", "Nelson Mandela", "Martin Luther King", "Che Guevara"],
      ["O apartheid foi um regime de segregação racial em qual país?", "África do Sul", "Brasil", "Índia", "Egito"],
      ["Quem liderou a Revolução Cubana de 1959?", "Fidel Castro", "Simón Bolívar", "Salvador Allende", "Juan Perón"]
    ],

    geografia: [
      ["Qual é o maior país do mundo em área?", "Rússia", "Canadá", "China", "Estados Unidos"],
      ["Qual é a capital do Canadá?", "Ottawa", "Toronto", "Vancouver", "Montreal"],
      ["Em qual país fica a maior parte do deserto do Atacama?", "Chile", "Argentina", "Brasil", "México"],
      ["Terremotos ocorrem principalmente por causa:", "do movimento das placas tectônicas", "dos ventos fortes", "das marés", "dos eclipses"],
      ["O aquecimento global está ligado principalmente ao aumento:", "dos gases do efeito estufa", "da camada de ozônio", "das chuvas", "das marés"],
      ["Qual é a capital da Austrália?", "Camberra (Canberra)", "Sydney", "Melbourne", "Perth"],
      ["Qual é a capital dos Estados Unidos?", "Washington, D.C.", "Nova York", "Los Angeles", "Chicago"],
      ["Qual é o maior rio do mundo em volume de água?", "Amazonas", "Nilo", "Mississippi", "Yangtzé"],
      ["O Mercosul é um bloco econômico formado por países da:", "América do Sul", "Europa", "Ásia", "África"],
      ["Como se chama o crescimento das cidades e da população urbana?", "urbanização", "erosão", "desertificação", "glaciação"],
      ["A sigla IDH significa:", "Índice de Desenvolvimento Humano", "Índice de Densidade Habitacional", "Indicador de Diversidade Histórica", "Índice de Distribuição de Habitantes"],
      ["O Meridiano de Greenwich, referência dos fusos horários, tem o nome de uma cidade de qual país?", "Reino Unido", "Estados Unidos", "França", "Alemanha"],
      ["Qual destas é uma fonte de energia renovável?", "solar", "carvão mineral", "petróleo", "gás natural"],
      ["No Brasil, a principal fonte de energia elétrica é:", "hidrelétrica", "nuclear", "carvão", "eólica"],
      ["Qual é a maior floresta tropical do mundo?", "Amazônica", "do Congo", "Daintree", "Taiga"],
      ["Um tsunami é causado geralmente por:", "terremotos no fundo do mar", "ventos alísios", "chuvas fortes", "marés lunares"],
      ["Qual é a capital da China?", "Pequim", "Xangai", "Hong Kong", "Cantão"],
      ["O Canal do Panamá liga quais oceanos?", "Atlântico e Pacífico", "Índico e Pacífico", "Atlântico e Índico", "Ártico e Atlântico"],
      ["O clima predominante no Brasil é o:", "tropical", "polar", "desértico", "mediterrâneo"],
      ["A Cordilheira dos Andes fica em qual continente?", "América do Sul", "Europa", "Ásia", "África"],
      ["Em relação ao Equador, a maior parte do Brasil está no hemisfério:", "Sul", "Norte", "Boreal", "Ártico"],
      ["Êxodo rural é a migração:", "do campo para a cidade", "da cidade para o campo", "entre países", "entre continentes"],
      ["Qual continente é coberto quase totalmente por gelo?", "Antártida", "Europa", "Oceania", "Ásia"],
      ["Qual é a maior ilha do mundo?", "Groenlândia", "Madagascar", "Cuba", "Islândia"],
      ["Qual é a capital do Egito?", "Cairo", "Alexandria", "Luxor", "Gizé"],
      ["Qual grande rio atravessa o Egito?", "Nilo", "Congo", "Níger", "Zambeze"],
      ["Qual destes países africanos tem o português como língua oficial?", "Angola", "Nigéria", "Quênia", "Egito"],
      ["O “Círculo de Fogo do Pacífico” é uma região com muitos:", "vulcões e terremotos", "desertos", "rios", "geleiras"],
      ["As estações do ano ocorrem principalmente por causa da:", "inclinação do eixo da Terra", "distância entre a Terra e a Lua", "rotação da Lua", "variação do tamanho do Sol"],
      ["Qual é a capital da Itália?", "Roma", "Milão", "Veneza", "Nápoles"]
    ]
  }
};

/* ---------------------------------------------------------------------------
   Sorteio de partidas: perguntas misturadas entre as 5 matérias, sem repetir.
   Retorna: [{ materia, pergunta, alternativas: [4 textos], correta: índice }]
   --------------------------------------------------------------------------- */
const Perguntas = {

  embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  sortear(nivel, quantidade) {
    // [INTEGRAÇÃO PHP/MySQL] Aqui entra o fetch('api/perguntas.php?nivel=' + nivel + '&qtd=' + quantidade).
    const banco = BANCO_PERGUNTAS[nivel];
    const materias = Object.keys(MATERIAS);
    const reservas = {};
    materias.forEach(m => { reservas[m] = this.embaralhar(banco[m]); });

    const total = Math.min(quantidade, materias.length * 30);
    const partida = [];
    let rodada = [];
    let ultima = null;

    while (partida.length < total) {
      if (!rodada.length) {
        rodada = this.embaralhar(materias);
        // evita duas perguntas seguidas da mesma matéria na virada de rodada
        if (rodada[rodada.length - 1] === ultima && rodada.length > 1) rodada.unshift(rodada.pop());
      }
      const materia = rodada.pop();
      if (!reservas[materia].length) continue;
      const [enunciado, certa, ...erradas] = reservas[materia].pop();
      const alternativas = this.embaralhar([certa, ...erradas]);
      partida.push({ materia, pergunta: enunciado, alternativas, correta: alternativas.indexOf(certa) });
      ultima = materia;
      if (materias.every(m => !reservas[m].length)) break;
    }
    return partida;
  }
};
