-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/09/2026 às 22:51
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `quiz_feira`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `perguntas`
--

CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `nivel` enum('fundamental','medio') NOT NULL,
  `materia` varchar(30) NOT NULL,
  `pergunta` text NOT NULL,
  `alternativa_a` varchar(255) NOT NULL,
  `alternativa_b` varchar(255) NOT NULL,
  `alternativa_c` varchar(255) NOT NULL,
  `alternativa_d` varchar(255) NOT NULL,
  `correta` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perguntas`
--

INSERT INTO `perguntas` (`id`, `nivel`, `materia`, `pergunta`, `alternativa_a`, `alternativa_b`, `alternativa_c`, `alternativa_d`, `correta`) VALUES
(1, 'fundamental', 'matematica', 'Quanto é 8 x 7?', '54', '56', '58', '64', 'B'),
(2, 'fundamental', 'matematica', 'Quanto é 7 x 8?', '54', '56', '64', '60', 'B'),
(3, 'fundamental', 'ciencias', 'Qual planeta é conhecido como planeta vermelho?', 'Terra', 'Marte', 'Jupiter', 'Saturno', 'B'),
(4, 'fundamental', 'portugues', 'Qual é o plural de papel?', 'Papels', 'Papeis', 'Papéis', 'Papeles', 'C'),
(5, 'fundamental', 'historia', 'Quem descobriu o Brasil?', 'Dom Pedro I', 'Pedro Álvares Cabral', 'Tiradentes', 'Getúlio Vargas', 'B'),
(6, 'fundamental', 'geografia', 'Qual é a capital do Brasil?', 'Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador', 'C'),
(7, 'medio', 'matematica', 'Qual é a fórmula da área do círculo?', '2πr', 'πr²', 'πd', 'r²', 'B'),
(8, 'medio', 'matematica', 'Qual é o valor de x na equação 2x + 6 = 18?', '4', '5', '6', '7', 'C'),
(9, 'medio', 'matematica', 'Qual é a raiz quadrada de 144?', '10', '11', '12', '13', 'C'),
(10, 'medio', 'matematica', 'Quanto é 15% de 200?', '20', '25', '30', '35', 'C'),
(11, 'medio', 'matematica', 'Qual é o resultado de 3² + 4²?', '12', '25', '49', '18', 'B'),
(12, 'medio', 'matematica', 'Qual é o valor de π aproximadamente?', '2,14', '3,14', '4,13', '3,41', 'B'),
(13, 'medio', 'portugues', 'Qual figura de linguagem está presente em \"Estou morrendo de fome\"?', 'Metáfora', 'Hipérbole', 'Ironia', 'Eufemismo', 'B'),
(14, 'medio', 'portugues', 'Qual é o sujeito da frase \"Os alunos estudaram bastante\"?', 'Os', 'Alunos', 'Os alunos', 'Estudaram', 'C'),
(15, 'medio', 'portugues', 'Qual palavra está escrita corretamente?', 'Excessão', 'Exceção', 'Ecessão', 'Exeção', 'B'),
(16, 'medio', 'portugues', 'Qual é o plural de cidadão?', 'Cidadãos', 'Cidadões', 'Cidadães', 'Cidadans', 'A'),
(17, 'medio', 'portugues', 'Qual é o antônimo de abundante?', 'Escasso', 'Grande', 'Cheio', 'Completo', 'A'),
(18, 'medio', 'ciencias', 'Qual organela realiza a respiração celular?', 'Núcleo', 'Mitocôndria', 'Ribossomo', 'Lisossomo', 'B'),
(19, 'medio', 'ciencias', 'Qual gás é mais abundante na atmosfera terrestre?', 'Oxigênio', 'Nitrogênio', 'Hidrogênio', 'Gás Carbônico', 'B'),
(20, 'medio', 'ciencias', 'Qual planeta é conhecido como planeta vermelho?', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'B'),
(21, 'medio', 'ciencias', 'Qual é a fórmula química da água?', 'H2O', 'CO2', 'O2', 'NaCl', 'A'),
(22, 'medio', 'ciencias', 'Qual órgão bombeia sangue pelo corpo?', 'Pulmão', 'Fígado', 'Coração', 'Rim', 'C'),
(23, 'medio', 'historia', 'Em que ano ocorreu a Proclamação da República?', '1889', '1822', '1500', '1930', 'A'),
(24, 'medio', 'historia', 'Quem foi o primeiro presidente do Brasil?', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'Dom Pedro II', 'B'),
(25, 'medio', 'historia', 'Qual civilização construiu as pirâmides de Gizé?', 'Romanos', 'Maias', 'Egípcios', 'Gregos', 'C'),
(26, 'medio', 'historia', 'Quem liderou a independência do Brasil?', 'Tiradentes', 'Dom Pedro I', 'Cabral', 'Getúlio Vargas', 'B'),
(27, 'medio', 'historia', 'A Segunda Guerra Mundial terminou em qual ano?', '1940', '1943', '1945', '1950', 'C'),
(28, 'medio', 'geografia', 'Qual é o maior país da América do Sul?', 'Argentina', 'Brasil', 'Chile', 'Peru', 'B'),
(29, 'medio', 'geografia', 'Qual é o rio mais extenso do mundo segundo muitos estudos?', 'Nilo', 'Amazonas', 'Mississippi', 'Yangtzé', 'B'),
(30, 'medio', 'geografia', 'Qual continente possui o maior número de países?', 'Europa', 'Ásia', 'África', 'América', 'C'),
(31, 'medio', 'geografia', 'Qual é a capital da Austrália?', 'Sydney', 'Melbourne', 'Canberra', 'Perth', 'C'),
(32, 'medio', 'geografia', 'Qual linha imaginária divide a Terra em hemisférios norte e sul?', 'Trópico de Capricórnio', 'Meridiano de Greenwich', 'Linha Internacional de Data', 'Equador', 'D'),
(33, 'fundamental', 'matematica', 'Quanto é 9 x 8?', '72', '81', '64', '56', 'A'),
(34, 'fundamental', 'matematica', 'Quanto é 100 ÷ 4?', '20', '25', '30', '40', 'B'),
(35, 'fundamental', 'matematica', 'Quanto é 15 + 27?', '42', '41', '43', '40', 'A'),
(36, 'fundamental', 'matematica', 'Quanto é 50 - 18?', '30', '32', '34', '36', 'B'),
(37, 'fundamental', 'portugues', 'Qual é o plural de flor?', 'Flores', 'Flors', 'Floris', 'Floras', 'A'),
(38, 'fundamental', 'portugues', 'Qual palavra é um verbo?', 'Mesa', 'Correr', 'Casa', 'Lápis', 'B'),
(39, 'fundamental', 'portugues', 'Qual é o feminino de rei?', 'Princesa', 'Rainha', 'Dama', 'Moça', 'B'),
(40, 'fundamental', 'portugues', 'Qual palavra está correta?', 'Geito', 'Jeito', 'Jeyto', 'Geyto', 'B'),
(41, 'fundamental', 'ciencias', 'Qual planeta vivemos?', 'Marte', 'Júpiter', 'Terra', 'Saturno', 'C'),
(42, 'fundamental', 'ciencias', 'Qual órgão usamos para respirar?', 'Pulmão', 'Coração', 'Rim', 'Fígado', 'A'),
(43, 'fundamental', 'ciencias', 'A água é formada por quais elementos?', 'Hidrogênio e Oxigênio', 'Carbono e Oxigênio', 'Nitrogênio e Hidrogênio', 'Sódio e Cloro', 'A'),
(44, 'fundamental', 'ciencias', 'Qual estrela ilumina a Terra?', 'Lua', 'Sol', 'Marte', 'Saturno', 'B'),
(45, 'fundamental', 'historia', 'Quem foi o primeiro imperador do Brasil?', 'Dom Pedro I', 'Tiradentes', 'Cabral', 'Getúlio Vargas', 'A'),
(46, 'fundamental', 'historia', 'Em que ano o Brasil foi descoberto?', '1500', '1822', '1889', '1900', 'A'),
(47, 'fundamental', 'historia', 'Quem assinou a Lei Áurea?', 'Princesa Isabel', 'Dom Pedro I', 'Getúlio Vargas', 'Tiradentes', 'A'),
(48, 'fundamental', 'historia', 'Qual povo construiu as pirâmides?', 'Romanos', 'Egípcios', 'Gregos', 'Maias', 'B'),
(49, 'fundamental', 'geografia', 'Qual é a capital de Minas Gerais?', 'Belo Horizonte', 'Brasília', 'Salvador', 'Curitiba', 'A'),
(50, 'fundamental', 'geografia', 'Qual é o maior país da América do Sul?', 'Argentina', 'Brasil', 'Chile', 'Peru', 'B'),
(51, 'fundamental', 'geografia', 'Quantos continentes existem tradicionalmente?', '5', '6', '7', '8', 'C'),
(52, 'fundamental', 'geografia', 'Qual oceano banha o litoral brasileiro?', 'Atlântico', 'Pacífico', 'Índico', 'Ártico', 'A'),
(53, 'fundamental', 'matematica', 'Quanto é 6 x 7?', '42', '36', '48', '49', 'A'),
(54, 'fundamental', 'matematica', 'Quanto é 9 + 8?', '15', '16', '17', '18', 'C'),
(55, 'fundamental', 'matematica', 'Quanto é 25 - 9?', '14', '15', '16', '17', 'C'),
(56, 'fundamental', 'matematica', 'Quanto é 72 ÷ 8?', '7', '8', '9', '10', 'C'),
(57, 'fundamental', 'matematica', 'Quanto é 5 x 9?', '40', '45', '50', '55', 'B'),
(58, 'fundamental', 'matematica', 'Quanto é 100 - 45?', '45', '50', '55', '60', 'C'),
(59, 'fundamental', 'matematica', 'Quanto é 12 + 15?', '25', '26', '27', '28', 'C'),
(60, 'fundamental', 'matematica', 'Quanto é 81 ÷ 9?', '7', '8', '9', '10', 'C'),
(61, 'fundamental', 'matematica', 'Quanto é 14 x 2?', '26', '28', '30', '32', 'B'),
(62, 'fundamental', 'matematica', 'Quanto é metade de 50?', '20', '25', '30', '35', 'B'),
(63, 'fundamental', 'portugues', 'Qual é o plural de cão?', 'Cãos', 'Cães', 'Cãezes', 'Caos', 'B'),
(64, 'fundamental', 'portugues', 'Qual é o feminino de garoto?', 'Garotinha', 'Garota', 'Menina', 'Moça', 'B'),
(65, 'fundamental', 'portugues', 'Qual palavra é um verbo?', 'Mesa', 'Cadeira', 'Correr', 'Lápis', 'C'),
(66, 'fundamental', 'portugues', 'Qual palavra está correta?', 'Excola', 'Escola', 'Iscola', 'Ezcola', 'B'),
(67, 'fundamental', 'portugues', 'Qual é o plural de livro?', 'Livres', 'Livros', 'Livroes', 'Livris', 'B'),
(68, 'fundamental', 'portugues', 'Qual destas palavras é um animal?', 'Janela', 'Computador', 'Cachorro', 'Caneta', 'C'),
(69, 'fundamental', 'portugues', 'Qual é o antônimo de grande?', 'Alto', 'Pequeno', 'Largo', 'Forte', 'B'),
(70, 'fundamental', 'portugues', 'Qual palavra indica uma cor?', 'Azul', 'Mesa', 'Carro', 'Papel', 'A'),
(71, 'fundamental', 'portugues', 'Qual destas palavras é um substantivo?', 'Bonito', 'Correr', 'Casa', 'Rapidamente', 'C'),
(72, 'fundamental', 'portugues', 'Qual é o plural de papel?', 'Papels', 'Papeis', 'Papéis', 'Papelas', 'C'),
(73, 'fundamental', 'ciencias', 'Qual planeta habitamos?', 'Marte', 'Terra', 'Júpiter', 'Saturno', 'B'),
(74, 'fundamental', 'ciencias', 'Qual estrela ilumina a Terra?', 'Lua', 'Sol', 'Marte', 'Vênus', 'B'),
(75, 'fundamental', 'ciencias', 'Qual órgão usamos para enxergar?', 'Nariz', 'Ouvido', 'Olhos', 'Boca', 'C'),
(76, 'fundamental', 'ciencias', 'Qual gás respiramos para viver?', 'Nitrogênio', 'Oxigênio', 'Hidrogênio', 'Hélio', 'B'),
(77, 'fundamental', 'ciencias', 'A água é formada por quais elementos?', 'Hidrogênio e Oxigênio', 'Carbono e Oxigênio', 'Sódio e Cloro', 'Ferro e Carbono', 'A'),
(78, 'fundamental', 'ciencias', 'Quantas pernas possui uma aranha?', '6', '8', '10', '12', 'B'),
(79, 'fundamental', 'ciencias', 'Qual é o maior animal terrestre?', 'Leão', 'Girafa', 'Elefante', 'Cavalo', 'C'),
(80, 'fundamental', 'ciencias', 'Qual parte da planta absorve água?', 'Folha', 'Flor', 'Raiz', 'Fruto', 'C'),
(81, 'fundamental', 'ciencias', 'Qual é o satélite natural da Terra?', 'Sol', 'Lua', 'Marte', 'Plutão', 'B'),
(82, 'fundamental', 'ciencias', 'Qual sentido usamos para ouvir?', 'Visão', 'Tato', 'Audição', 'Paladar', 'C'),
(83, 'fundamental', 'historia', 'Quem descobriu o Brasil?', 'Dom Pedro I', 'Pedro Álvares Cabral', 'Tiradentes', 'Getúlio Vargas', 'B'),
(84, 'fundamental', 'historia', 'Em que ano o Brasil foi descoberto?', '1500', '1822', '1889', '1900', 'A'),
(85, 'fundamental', 'historia', 'Quem proclamou a Independência do Brasil?', 'Dom Pedro I', 'Cabral', 'Tiradentes', 'Getúlio Vargas', 'A'),
(86, 'fundamental', 'historia', 'Quem assinou a Lei Áurea?', 'Princesa Isabel', 'Dom Pedro I', 'Anita Garibaldi', 'Maria Quitéria', 'A'),
(87, 'fundamental', 'historia', 'Qual era o nome do primeiro imperador do Brasil?', 'Dom Pedro I', 'Dom Pedro II', 'Cabral', 'Deodoro', 'A'),
(88, 'fundamental', 'historia', 'Quem foi Tiradentes?', 'Imperador', 'Militar', 'Inconfidente Mineiro', 'Presidente', 'C'),
(89, 'fundamental', 'historia', 'A República foi proclamada em qual ano?', '1822', '1889', '1500', '1930', 'B'),
(90, 'fundamental', 'historia', 'Qual povo construiu as pirâmides?', 'Romanos', 'Egípcios', 'Gregos', 'Maias', 'B'),
(91, 'fundamental', 'historia', 'Quem foi o primeiro presidente do Brasil?', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'Tancredo Neves', 'B'),
(92, 'fundamental', 'historia', 'Qual país colonizou o Brasil?', 'Espanha', 'Portugal', 'França', 'Inglaterra', 'B'),
(93, 'fundamental', 'geografia', 'Qual é a capital do Brasil?', 'Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador', 'C'),
(94, 'fundamental', 'geografia', 'Qual é o maior país da América do Sul?', 'Argentina', 'Brasil', 'Chile', 'Peru', 'B'),
(95, 'fundamental', 'geografia', 'Quantos continentes existem tradicionalmente?', '5', '6', '7', '8', 'C'),
(96, 'fundamental', 'geografia', 'Qual oceano banha o Brasil?', 'Índico', 'Pacífico', 'Atlântico', 'Ártico', 'C'),
(97, 'fundamental', 'geografia', 'Qual é a capital da Argentina?', 'Lima', 'Buenos Aires', 'Santiago', 'Montevidéu', 'B'),
(98, 'fundamental', 'geografia', 'Qual é a capital de Minas Gerais?', 'Belo Horizonte', 'Vitória', 'Goiânia', 'Curitiba', 'A'),
(99, 'fundamental', 'geografia', 'Qual é o maior oceano do planeta?', 'Atlântico', 'Índico', 'Pacífico', 'Ártico', 'C'),
(100, 'fundamental', 'geografia', 'Qual linha divide a Terra em hemisfério norte e sul?', 'Greenwich', 'Equador', 'Capricórnio', 'Câncer', 'B'),
(101, 'fundamental', 'geografia', 'Qual é o estado brasileiro conhecido pela floresta Amazônica?', 'Amazonas', 'Paraná', 'Bahia', 'Goiás', 'A'),
(102, 'fundamental', 'geografia', 'Qual é o continente do Brasil?', 'Europa', 'Ásia', 'América do Sul', 'África', 'C'),
(103, 'fundamental', 'matematica', 'Quanto é 8 x 9?', '72', '81', '64', '56', 'A'),
(104, 'fundamental', 'matematica', 'Quanto é 35 + 27?', '60', '61', '62', '63', 'C'),
(105, 'fundamental', 'matematica', 'Quanto é 90 - 38?', '50', '51', '52', '53', 'C'),
(106, 'fundamental', 'matematica', 'Quanto é 63 ÷ 7?', '8', '9', '10', '11', 'B'),
(107, 'fundamental', 'matematica', 'Quanto é 11 x 5?', '50', '55', '60', '65', 'B'),
(108, 'fundamental', 'matematica', 'Quanto é 120 ÷ 10?', '10', '11', '12', '13', 'C'),
(109, 'fundamental', 'matematica', 'Quanto é 19 + 14?', '31', '32', '33', '34', 'C'),
(110, 'fundamental', 'matematica', 'Quanto é 70 - 25?', '45', '40', '50', '55', 'A'),
(111, 'fundamental', 'matematica', 'Quanto é 7 x 12?', '72', '84', '96', '78', 'B'),
(112, 'fundamental', 'matematica', 'Quanto é a terça parte de 30?', '8', '9', '10', '11', 'C'),
(113, 'fundamental', 'portugues', 'Qual é o plural de lápis?', 'Lápises', 'Lápis', 'Lápizeis', 'Lápiss', 'B'),
(114, 'fundamental', 'portugues', 'Qual é o feminino de cavalo?', 'Potra', 'Égua', 'Vaca', 'Cabra', 'B'),
(115, 'fundamental', 'portugues', 'Qual destas palavras é uma fruta?', 'Banana', 'Mesa', 'Caneta', 'Janela', 'A'),
(116, 'fundamental', 'portugues', 'Qual palavra está correta?', 'Xícara', 'Xicara', 'Xikara', 'Chícara', 'A'),
(117, 'fundamental', 'portugues', 'Qual é o antônimo de quente?', 'Frio', 'Morno', 'Calor', 'Fogo', 'A'),
(118, 'fundamental', 'portugues', 'Qual destas palavras é um verbo?', 'Brincar', 'Brinquedo', 'Bola', 'Parque', 'A'),
(119, 'fundamental', 'portugues', 'Qual é o plural de animal?', 'Animais', 'Animales', 'Animãos', 'Animales', 'A'),
(120, 'fundamental', 'portugues', 'Qual palavra representa uma profissão?', 'Professor', 'Lápis', 'Carro', 'Casa', 'A'),
(121, 'fundamental', 'portugues', 'Qual destas palavras é uma cor?', 'Amarelo', 'Mesa', 'Porta', 'Caderno', 'A'),
(122, 'fundamental', 'portugues', 'Qual palavra está escrita corretamente?', 'Passarinho', 'Pássarinho', 'Passsarinho', 'Pasarinho', 'A'),
(123, 'fundamental', 'ciencias', 'Qual animal produz leite para seus filhotes?', 'Mamífero', 'Peixe', 'Inseto', 'Réptil', 'A'),
(124, 'fundamental', 'ciencias', 'Qual é o maior planeta do Sistema Solar?', 'Terra', 'Marte', 'Júpiter', 'Vênus', 'C'),
(125, 'fundamental', 'ciencias', 'Qual parte do corpo usamos para sentir cheiros?', 'Olho', 'Nariz', 'Boca', 'Ouvido', 'B'),
(126, 'fundamental', 'ciencias', 'Qual é o estado físico do gelo?', 'Gasoso', 'Líquido', 'Sólido', 'Vapor', 'C'),
(127, 'fundamental', 'ciencias', 'Quantos dentes tem normalmente um adulto?', '20', '24', '28', '32', 'D'),
(128, 'fundamental', 'ciencias', 'Qual órgão é responsável por bombear sangue?', 'Pulmão', 'Fígado', 'Coração', 'Rim', 'C'),
(129, 'fundamental', 'ciencias', 'Qual é a principal fonte de energia da Terra?', 'Lua', 'Sol', 'Vento', 'Chuva', 'B'),
(130, 'fundamental', 'ciencias', 'As plantas produzem qual gás?', 'Nitrogênio', 'Oxigênio', 'Hidrogênio', 'Hélio', 'B'),
(131, 'fundamental', 'ciencias', 'Qual animal é conhecido como rei da selva?', 'Tigre', 'Leão', 'Urso', 'Elefante', 'B'),
(132, 'fundamental', 'ciencias', 'Qual líquido é essencial para a vida?', 'Leite', 'Refrigerante', 'Água', 'Suco', 'C'),
(133, 'fundamental', 'historia', 'Quem chegou ao Brasil em 1500?', 'Pedro Álvares Cabral', 'Dom Pedro I', 'Tiradentes', 'Deodoro', 'A'),
(134, 'fundamental', 'historia', 'Qual princesa assinou a Lei Áurea?', 'Leopoldina', 'Isabel', 'Maria', 'Teresa', 'B'),
(135, 'fundamental', 'historia', 'Qual foi o primeiro nome dado ao Brasil?', 'Terra do Pau-Brasil', 'Ilha de Vera Cruz', 'Brasil Colonial', 'Nova Portugal', 'B'),
(136, 'fundamental', 'historia', 'Quem proclamou a República?', 'Cabral', 'Dom Pedro I', 'Deodoro da Fonseca', 'Vargas', 'C'),
(137, 'fundamental', 'historia', 'Em qual século ocorreu o descobrimento do Brasil?', 'XV', 'XVI', 'XVII', 'XVIII', 'B'),
(138, 'fundamental', 'historia', 'Qual povo habitava o Brasil antes dos portugueses?', 'Romanos', 'Egípcios', 'Indígenas', 'Gregos', 'C'),
(139, 'fundamental', 'historia', 'Qual era a principal atividade econômica colonial?', 'Petróleo', 'Açúcar', 'Automóveis', 'Eletrônicos', 'B'),
(140, 'fundamental', 'historia', 'Quem foi Dom Pedro II?', 'Imperador do Brasil', 'Presidente', 'Navegador', 'Militar', 'A'),
(141, 'fundamental', 'historia', 'Qual país fica na Europa?', 'Brasil', 'Portugal', 'Argentina', 'Chile', 'B'),
(142, 'fundamental', 'historia', 'Quem foi conhecido como o Libertador dos Escravos?', 'Cabral', 'Tiradentes', 'Princesa Isabel', 'Vargas', 'C'),
(143, 'fundamental', 'geografia', 'Qual é a capital do estado de São Paulo?', 'Campinas', 'Santos', 'São Paulo', 'Sorocaba', 'C'),
(144, 'fundamental', 'geografia', 'Qual é o maior estado brasileiro em área?', 'Bahia', 'Amazonas', 'Minas Gerais', 'Pará', 'B'),
(145, 'fundamental', 'geografia', 'Qual continente é o maior do mundo?', 'Europa', 'África', 'Ásia', 'Oceania', 'C'),
(146, 'fundamental', 'geografia', 'Qual é a capital da França?', 'Roma', 'Madri', 'Paris', 'Lisboa', 'C'),
(147, 'fundamental', 'geografia', 'Qual país faz fronteira com o Brasil?', 'Portugal', 'México', 'Argentina', 'Canadá', 'C'),
(148, 'fundamental', 'geografia', 'Qual é o oceano entre América e Europa?', 'Índico', 'Atlântico', 'Pacífico', 'Ártico', 'B'),
(149, 'fundamental', 'geografia', 'Qual é a capital do Japão?', 'Pequim', 'Seul', 'Tóquio', 'Bangkok', 'C'),
(150, 'fundamental', 'geografia', 'Qual região do Brasil possui a floresta Amazônica?', 'Sul', 'Nordeste', 'Norte', 'Sudeste', 'C'),
(151, 'fundamental', 'geografia', 'Qual é a capital de Portugal?', 'Porto', 'Lisboa', 'Coimbra', 'Braga', 'B'),
(152, 'fundamental', 'geografia', 'Qual é o menor continente?', 'Europa', 'Oceania', 'África', 'América', 'B'),
(153, 'medio', 'matematica', 'Quanto é 15²?', '215', '225', '235', '245', 'B'),
(154, 'medio', 'matematica', 'Quanto é 25% de 80?', '15', '20', '25', '30', 'B'),
(155, 'medio', 'matematica', 'Quanto é 18 x 12?', '196', '206', '216', '226', 'C'),
(156, 'medio', 'matematica', 'Qual é a raiz quadrada de 169?', '11', '12', '13', '14', 'C'),
(157, 'medio', 'matematica', 'Quanto é 144 ÷ 12?', '10', '11', '12', '13', 'C'),
(158, 'medio', 'matematica', 'Quanto é 7³?', '343', '243', '443', '353', 'A'),
(159, 'medio', 'matematica', 'Quanto é 30% de 200?', '40', '50', '60', '70', 'C'),
(160, 'medio', 'matematica', 'Qual é o resultado de 5² + 4²?', '31', '41', '51', '21', 'B'),
(161, 'medio', 'matematica', 'Quanto é 9 x 13?', '107', '117', '127', '137', 'B'),
(162, 'medio', 'matematica', 'Quanto é 200 - 85?', '105', '115', '125', '135', 'B'),
(163, 'medio', 'portugues', 'Qual é o sinônimo de feliz?', 'Triste', 'Alegre', 'Bravo', 'Cansado', 'B'),
(164, 'medio', 'portugues', 'Qual é o antônimo de rápido?', 'Ágil', 'Lento', 'Breve', 'Veloz', 'B'),
(165, 'medio', 'portugues', 'Qual palavra é um substantivo?', 'Bonito', 'Correr', 'Cidade', 'Rapidamente', 'C'),
(166, 'medio', 'portugues', 'Qual palavra é um adjetivo?', 'Casa', 'Mesa', 'Bonito', 'Livro', 'C'),
(167, 'medio', 'portugues', 'Qual palavra está correta?', 'Exceção', 'Excessão', 'Eceção', 'Exeção', 'A'),
(168, 'medio', 'portugues', 'Qual é o plural de cidadão?', 'Cidadãos', 'Cidadões', 'Cidadães', 'Cidadans', 'A'),
(169, 'medio', 'portugues', 'Qual é o feminino de herói?', 'Heroina', 'Heroína', 'Heroa', 'Heroisa', 'B'),
(170, 'medio', 'portugues', 'Qual destas palavras é um verbo?', 'Andar', 'Rua', 'Carro', 'Prédio', 'A'),
(171, 'medio', 'portugues', 'Qual frase está correta?', 'Nós vai estudar', 'Nós vamos estudar', 'Nós estuda', 'Nós vão estudar', 'B'),
(172, 'medio', 'portugues', 'Qual palavra indica uma ação?', 'Correr', 'Mesa', 'Caneta', 'Janela', 'A'),
(173, 'medio', 'ciencias', 'Qual é o maior planeta do Sistema Solar?', 'Terra', 'Saturno', 'Júpiter', 'Marte', 'C'),
(174, 'medio', 'ciencias', 'Qual gás é essencial para a respiração humana?', 'Hélio', 'Oxigênio', 'Nitrogênio', 'Hidrogênio', 'B'),
(175, 'medio', 'ciencias', 'Qual órgão filtra o sangue?', 'Pulmão', 'Coração', 'Rim', 'Pele', 'C'),
(176, 'medio', 'ciencias', 'Qual é a estrela do Sistema Solar?', 'Lua', 'Sol', 'Marte', 'Vênus', 'B'),
(177, 'medio', 'ciencias', 'Qual vitamina é produzida pela exposição ao Sol?', 'A', 'B', 'C', 'D', 'D'),
(178, 'medio', 'ciencias', 'Qual é o símbolo químico do ouro?', 'Ag', 'Au', 'Fe', 'O', 'B'),
(179, 'medio', 'ciencias', 'Qual planeta é conhecido como planeta vermelho?', 'Terra', 'Marte', 'Saturno', 'Netuno', 'B'),
(180, 'medio', 'ciencias', 'Qual é a fórmula química da água?', 'CO2', 'H2O', 'NaCl', 'O2', 'B'),
(181, 'medio', 'ciencias', 'Qual é o órgão responsável pela circulação do sangue?', 'Pulmão', 'Fígado', 'Coração', 'Rim', 'C'),
(182, 'medio', 'ciencias', 'Quantos ossos possui aproximadamente um adulto?', '106', '156', '206', '256', 'C'),
(183, 'medio', 'historia', 'Em que ano ocorreu a Independência do Brasil?', '1822', '1889', '1500', '1930', 'A'),
(184, 'medio', 'historia', 'Quem proclamou a República do Brasil?', 'Cabral', 'Dom Pedro I', 'Deodoro da Fonseca', 'Vargas', 'C'),
(185, 'medio', 'historia', 'Quem descobriu o Brasil?', 'Tiradentes', 'Cabral', 'Vargas', 'Anchieta', 'B'),
(186, 'medio', 'historia', 'Qual civilização construiu as pirâmides?', 'Romanos', 'Maias', 'Egípcios', 'Gregos', 'C'),
(187, 'medio', 'historia', 'Quem assinou a Lei Áurea?', 'Princesa Isabel', 'Leopoldina', 'Maria I', 'Anita Garibaldi', 'A'),
(188, 'medio', 'historia', 'A Segunda Guerra Mundial terminou em qual ano?', '1942', '1943', '1945', '1948', 'C'),
(189, 'medio', 'historia', 'Quem foi Tiradentes?', 'Imperador', 'Inconfidente Mineiro', 'Presidente', 'Navegador', 'B'),
(190, 'medio', 'historia', 'Qual país colonizou o Brasil?', 'França', 'Portugal', 'Espanha', 'Inglaterra', 'B'),
(191, 'medio', 'historia', 'Quem foi o primeiro presidente do Brasil?', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'Tancredo Neves', 'B'),
(192, 'medio', 'historia', 'Em que ano o Brasil foi descoberto?', '1492', '1500', '1522', '1600', 'B'),
(193, 'medio', 'geografia', 'Qual é a capital do Canadá?', 'Toronto', 'Ottawa', 'Vancouver', 'Montreal', 'B'),
(194, 'medio', 'geografia', 'Qual é a capital da Austrália?', 'Sydney', 'Melbourne', 'Canberra', 'Perth', 'C'),
(195, 'medio', 'geografia', 'Qual é o maior oceano do planeta?', 'Atlântico', 'Índico', 'Pacífico', 'Ártico', 'C'),
(196, 'medio', 'geografia', 'Qual é o maior país do mundo em área?', 'China', 'Canadá', 'Rússia', 'Estados Unidos', 'C'),
(197, 'medio', 'geografia', 'Qual continente possui mais países?', 'Europa', 'Ásia', 'África', 'América', 'C'),
(198, 'medio', 'geografia', 'Qual é a capital da Itália?', 'Milão', 'Roma', 'Veneza', 'Nápoles', 'B'),
(199, 'medio', 'geografia', 'Qual linha imaginária passa por Greenwich?', 'Equador', 'Meridiano de Greenwich', 'Trópico de Câncer', 'Trópico de Capricórnio', 'B'),
(200, 'medio', 'geografia', 'Qual é a capital da Alemanha?', 'Munique', 'Hamburgo', 'Berlim', 'Frankfurt', 'C'),
(201, 'medio', 'geografia', 'Qual país é conhecido pelo formato de bota?', 'Espanha', 'Portugal', 'Itália', 'Grécia', 'C'),
(202, 'medio', 'geografia', 'Qual é o deserto mais famoso da África?', 'Atacama', 'Saara', 'Gobi', 'Kalahari', 'B'),
(203, 'medio', 'matematica', 'Quanto é 16²?', '246', '256', '266', '276', 'B'),
(204, 'medio', 'matematica', 'Quanto é 40% de 50?', '10', '15', '20', '25', 'C'),
(205, 'medio', 'matematica', 'Quanto é 21 x 4?', '74', '84', '94', '104', 'B'),
(206, 'medio', 'matematica', 'Qual é a raiz quadrada de 225?', '13', '14', '15', '16', 'C'),
(207, 'medio', 'matematica', 'Quanto é 11²?', '111', '121', '131', '141', 'B'),
(208, 'medio', 'matematica', 'Quanto é 17 x 5?', '75', '80', '85', '90', 'C'),
(209, 'medio', 'matematica', 'Quanto é 50% de 90?', '40', '45', '50', '55', 'B'),
(210, 'medio', 'matematica', 'Quanto é 18²?', '314', '324', '334', '344', 'B'),
(211, 'medio', 'matematica', 'Quanto é 132 ÷ 11?', '10', '11', '12', '13', 'C'),
(212, 'medio', 'matematica', 'Quanto é 19 + 28?', '45', '46', '47', '48', 'C'),
(213, 'medio', 'portugues', 'Qual é o plural de pão?', 'Pãos', 'Pães', 'Pãos', 'Pãezes', 'B'),
(214, 'medio', 'portugues', 'Qual palavra é um adjetivo?', 'Azul', 'Mesa', 'Correr', 'Livro', 'A'),
(215, 'medio', 'portugues', 'Qual é o sinônimo de inteligente?', 'Esperto', 'Lento', 'Fraco', 'Pequeno', 'A'),
(216, 'medio', 'portugues', 'Qual palavra está correta?', 'Beneficiente', 'Beneficente', 'Benificente', 'Benefisente', 'B'),
(217, 'medio', 'portugues', 'Qual é o antônimo de antigo?', 'Velho', 'Novo', 'Usado', 'Clássico', 'B'),
(218, 'medio', 'portugues', 'Qual destas palavras é um substantivo?', 'Bonito', 'Alegria', 'Rapidamente', 'Estudar', 'B'),
(219, 'medio', 'portugues', 'Qual é o feminino de ator?', 'Atriz', 'Atora', 'Atrisa', 'Atrina', 'A'),
(220, 'medio', 'portugues', 'Qual frase está correta?', 'Houveram problemas', 'Houve problemas', 'Houveram um problema', 'Houvem problemas', 'B'),
(221, 'medio', 'portugues', 'Qual palavra indica ação?', 'Caminhar', 'Rua', 'Carro', 'Cidade', 'A'),
(222, 'medio', 'portugues', 'Qual é o plural de hotel?', 'Hotéis', 'Hotels', 'Hoteis', 'Hoteles', 'A'),
(223, 'medio', 'ciencias', 'Qual planeta está mais próximo do Sol?', 'Vênus', 'Mercúrio', 'Terra', 'Marte', 'B'),
(224, 'medio', 'ciencias', 'Qual é o símbolo químico da prata?', 'Pt', 'Ag', 'Au', 'Pb', 'B'),
(225, 'medio', 'ciencias', 'Qual gás é liberado pelas plantas na fotossíntese?', 'CO2', 'Oxigênio', 'Nitrogênio', 'Hélio', 'B'),
(226, 'medio', 'ciencias', 'Qual é o maior órgão do corpo humano?', 'Pulmão', 'Fígado', 'Pele', 'Coração', 'C'),
(227, 'medio', 'ciencias', 'Qual vitamina está presente em frutas cítricas?', 'A', 'B', 'C', 'D', 'C'),
(228, 'medio', 'ciencias', 'Qual planeta possui anéis visíveis?', 'Marte', 'Saturno', 'Mercúrio', 'Vênus', 'B'),
(229, 'medio', 'ciencias', 'Qual é a unidade de medida da força?', 'Joule', 'Newton', 'Watt', 'Volt', 'B'),
(230, 'medio', 'ciencias', 'Qual órgão produz a insulina?', 'Fígado', 'Pâncreas', 'Pulmão', 'Rim', 'B'),
(231, 'medio', 'ciencias', 'Qual é a velocidade aproximada da luz?', '300 mil km/s', '30 mil km/s', '3 mil km/s', '3 milhões km/s', 'A'),
(232, 'medio', 'ciencias', 'Qual metal é líquido à temperatura ambiente?', 'Ferro', 'Mercúrio', 'Alumínio', 'Prata', 'B'),
(233, 'medio', 'historia', 'Quem foi o líder da Alemanha na Segunda Guerra Mundial?', 'Stalin', 'Churchill', 'Hitler', 'Roosevelt', 'C'),
(234, 'medio', 'historia', 'Em que ano ocorreu a Proclamação da República?', '1822', '1889', '1930', '1945', 'B'),
(235, 'medio', 'historia', 'Qual navegador chegou ao Brasil em 1500?', 'Vasco da Gama', 'Cabral', 'Colombo', 'Magalhães', 'B'),
(236, 'medio', 'historia', 'Quem foi o primeiro imperador do Brasil?', 'Dom Pedro I', 'Dom Pedro II', 'Deodoro', 'Vargas', 'A'),
(237, 'medio', 'historia', 'Qual civilização criou o alfabeto fonético?', 'Egípcios', 'Romanos', 'Fenícios', 'Maias', 'C'),
(238, 'medio', 'historia', 'Quem liderou a Inconfidência Mineira?', 'Tiradentes', 'Cabral', 'José Bonifácio', 'Duque de Caxias', 'A'),
(239, 'medio', 'historia', 'A Revolução Francesa começou em qual ano?', '1789', '1776', '1804', '1815', 'A'),
(240, 'medio', 'historia', 'Quem foi conhecido como Libertador da América?', 'Napoleão', 'Bolívar', 'Cabral', 'Lincoln', 'B'),
(241, 'medio', 'historia', 'Qual país construiu o Coliseu?', 'Grécia', 'Egito', 'Roma', 'Pérsia', 'C'),
(242, 'medio', 'historia', 'Quem assinou a Lei Áurea?', 'Leopoldina', 'Isabel', 'Maria I', 'Carlota', 'B'),
(243, 'medio', 'geografia', 'Qual é a capital da Espanha?', 'Barcelona', 'Madri', 'Sevilha', 'Valência', 'B'),
(244, 'medio', 'geografia', 'Qual é o maior país da América do Sul?', 'Argentina', 'Brasil', 'Chile', 'Peru', 'B'),
(245, 'medio', 'geografia', 'Qual é a capital da China?', 'Xangai', 'Pequim', 'Hong Kong', 'Cantão', 'B'),
(246, 'medio', 'geografia', 'Qual continente abriga o Egito?', 'Europa', 'Ásia', 'África', 'Oceania', 'C'),
(247, 'medio', 'geografia', 'Qual é o rio mais famoso do Egito?', 'Amazonas', 'Nilo', 'Danúbio', 'Mississippi', 'B'),
(248, 'medio', 'geografia', 'Qual é a capital da Rússia?', 'Moscou', 'São Petersburgo', 'Kiev', 'Minsk', 'A'),
(249, 'medio', 'geografia', 'Qual país tem formato de bota?', 'Portugal', 'Itália', 'Grécia', 'Espanha', 'B'),
(250, 'medio', 'geografia', 'Qual é o maior deserto quente do mundo?', 'Atacama', 'Saara', 'Gobi', 'Mojave', 'B'),
(251, 'medio', 'geografia', 'Qual é a capital dos Estados Unidos?', 'Nova York', 'Los Angeles', 'Washington', 'Chicago', 'C'),
(252, 'medio', 'geografia', 'Qual é o oceano que banha a costa leste do Brasil?', 'Pacífico', 'Índico', 'Atlântico', 'Ártico', 'C'),
(253, 'medio', 'ciencias', 'Qual é o animal terrestre mais rápido do mundo?', 'Leão', 'Guepardo', 'Cavalo', 'Lobo', 'B'),
(254, 'medio', 'ciencias', 'Quantos planetas existem no Sistema Solar?', '7', '8', '9', '10', 'B'),
(255, 'medio', 'ciencias', 'Qual é o maior mamífero do planeta?', 'Elefante', 'Baleia Azul', 'Girafa', 'Hipopótamo', 'B'),
(256, 'medio', 'ciencias', 'Qual gás é responsável pelo efeito estufa em maior quantidade?', 'Oxigênio', 'Nitrogênio', 'Gás Carbônico', 'Hélio', 'C'),
(257, 'medio', 'ciencias', 'Qual é o osso mais longo do corpo humano?', 'Fêmur', 'Tíbia', 'Úmero', 'Rádio', 'A'),
(258, 'medio', 'ciencias', 'Qual planeta é conhecido pelos seus anéis?', 'Marte', 'Vênus', 'Saturno', 'Mercúrio', 'C'),
(259, 'medio', 'ciencias', 'Qual é o metal mais abundante na crosta terrestre?', 'Ferro', 'Alumínio', 'Ouro', 'Prata', 'B'),
(260, 'medio', 'ciencias', 'Qual parte do olho controla a entrada de luz?', 'Retina', 'Íris', 'Córnea', 'Pupila', 'B'),
(261, 'medio', 'ciencias', 'Qual é o nome da galáxia onde está o Sistema Solar?', 'Andrômeda', 'Via Láctea', 'Órion', 'Centauro', 'B'),
(262, 'medio', 'ciencias', 'Qual é o principal gás presente no ar?', 'Oxigênio', 'Nitrogênio', 'Gás Carbônico', 'Argônio', 'B'),
(263, 'medio', 'geografia', 'Qual é o país mais populoso da América do Sul?', 'Argentina', 'Brasil', 'Colômbia', 'Peru', 'B'),
(264, 'medio', 'geografia', 'Qual é a capital da Índia?', 'Mumbai', 'Nova Délhi', 'Calcutá', 'Goa', 'B'),
(265, 'medio', 'geografia', 'Qual é o maior rio do mundo em volume de água?', 'Nilo', 'Amazonas', 'Mississippi', 'Yangtzé', 'B'),
(266, 'medio', 'geografia', 'Qual é o menor país do mundo?', 'Mônaco', 'Malta', 'Vaticano', 'Luxemburgo', 'C'),
(267, 'medio', 'geografia', 'Qual continente possui o deserto do Saara?', 'Ásia', 'África', 'Europa', 'Oceania', 'B'),
(268, 'medio', 'geografia', 'Qual é a capital do México?', 'Cancún', 'Monterrey', 'Cidade do México', 'Guadalajara', 'C'),
(269, 'medio', 'geografia', 'Qual país tem a maior área territorial?', 'China', 'Canadá', 'Rússia', 'Estados Unidos', 'C'),
(270, 'medio', 'geografia', 'Qual é a capital da África do Sul administrativa?', 'Joanesburgo', 'Pretória', 'Cidade do Cabo', 'Durban', 'B'),
(271, 'medio', 'geografia', 'Qual oceano fica entre América e Europa?', 'Pacífico', 'Atlântico', 'Índico', 'Ártico', 'B'),
(272, 'medio', 'geografia', 'Qual é a capital da Coreia do Sul?', 'Busan', 'Seul', 'Incheon', 'Daegu', 'B'),
(273, 'medio', 'historia', 'Quem foi o primeiro homem a pisar na Lua?', 'Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn', 'B'),
(274, 'medio', 'historia', 'Em que ano ocorreu a chegada do homem à Lua?', '1965', '1967', '1969', '1971', 'C'),
(275, 'medio', 'historia', 'Quem foi o líder da luta pelos direitos civis nos EUA?', 'Nelson Mandela', 'Martin Luther King Jr.', 'Malcolm X', 'Lincoln', 'B'),
(276, 'medio', 'historia', 'Quem descobriu a América em 1492?', 'Cabral', 'Cristóvão Colombo', 'Magalhães', 'Vasco da Gama', 'B'),
(277, 'medio', 'historia', 'Qual civilização construiu Machu Picchu?', 'Maias', 'Astecas', 'Incas', 'Egípcios', 'C'),
(278, 'medio', 'historia', 'Qual era a capital do Império Romano?', 'Atenas', 'Roma', 'Paris', 'Londres', 'B'),
(279, 'medio', 'historia', 'Quem liderou a França durante parte da Revolução Francesa e do Império?', 'Luís XVI', 'Napoleão Bonaparte', 'Robespierre', 'Voltaire', 'B'),
(280, 'medio', 'historia', 'Em que século ocorreu o descobrimento do Brasil?', 'XV', 'XVI', 'XVII', 'XVIII', 'B'),
(281, 'medio', 'historia', 'Quem foi o primeiro presidente dos Estados Unidos?', 'Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams', 'B'),
(282, 'medio', 'historia', 'Qual povo criou os Jogos Olímpicos?', 'Romanos', 'Egípcios', 'Gregos', 'Persas', 'C'),
(283, 'medio', 'portugues', 'Qual é o coletivo de peixes?', 'Cardume', 'Alcateia', 'Rebanho', 'Enxame', 'A'),
(284, 'medio', 'portugues', 'Qual é o plural de chapéu?', 'Chapéus', 'Chapéis', 'Chapeis', 'Chapéos', 'A'),
(285, 'medio', 'portugues', 'Qual palavra é um advérbio?', 'Bonito', 'Rapidamente', 'Mesa', 'Cidade', 'B'),
(286, 'medio', 'portugues', 'Qual é o feminino de príncipe?', 'Princesa', 'Rainha', 'Duquesa', 'Imperatriz', 'A'),
(287, 'medio', 'portugues', 'Qual palavra está correta?', 'Paralização', 'Paralisação', 'Paralizassão', 'Paralisasão', 'B'),
(288, 'medio', 'portugues', 'Qual é o sinônimo de coragem?', 'Medo', 'Bravura', 'Preguiça', 'Fraqueza', 'B'),
(289, 'medio', 'portugues', 'Qual é o antônimo de humilde?', 'Simples', 'Orgulhoso', 'Gentil', 'Paciente', 'B'),
(290, 'medio', 'portugues', 'Qual é o plural de papel?', 'Papels', 'Papeis', 'Papéis', 'Papeles', 'C'),
(291, 'medio', 'portugues', 'Qual figura de linguagem exagera uma ideia?', 'Metáfora', 'Hipérbole', 'Ironia', 'Comparação', 'B'),
(292, 'medio', 'portugues', 'Qual palavra é um substantivo próprio?', 'Cidade', 'Brasil', 'País', 'Rua', 'B'),
(293, 'medio', 'matematica', 'Quanto é 14 x 14?', '186', '196', '206', '216', 'B'),
(294, 'medio', 'matematica', 'Quanto é 75% de 200?', '125', '150', '175', '200', 'B'),
(295, 'medio', 'matematica', 'Qual é a raiz quadrada de 196?', '12', '13', '14', '15', 'C'),
(296, 'medio', 'matematica', 'Quanto é 24 x 5?', '110', '120', '130', '140', 'B'),
(297, 'medio', 'matematica', 'Quanto é 250 ÷ 5?', '40', '45', '50', '55', 'C'),
(298, 'medio', 'matematica', 'Quanto é 13²?', '159', '169', '179', '189', 'B'),
(299, 'medio', 'matematica', 'Quanto é 45 + 37?', '80', '81', '82', '83', 'C'),
(300, 'medio', 'matematica', 'Quanto é 18 x 7?', '116', '126', '136', '146', 'B'),
(301, 'medio', 'matematica', 'Quanto é 20% de 250?', '40', '45', '50', '55', 'C'),
(302, 'medio', 'matematica', 'Quanto é 99 - 47?', '50', '51', '52', '53', 'C');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ranking`
--

CREATE TABLE `ranking` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `equipe` varchar(20) DEFAULT NULL,
  `nivel` varchar(20) DEFAULT NULL,
  `pontos` int(11) DEFAULT NULL,
  `acertos` int(11) DEFAULT NULL,
  `erros` int(11) DEFAULT NULL,
  `tempo` int(11) DEFAULT NULL,
  `percentual` int(11) DEFAULT NULL,
  `data_jogo` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `resultados`
--

CREATE TABLE `resultados` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `equipe` varchar(50) NOT NULL,
  `pontos` int(11) DEFAULT 0,
  `acertos` int(11) DEFAULT 0,
  `erros` int(11) DEFAULT 0,
  `tempo` int(11) DEFAULT 0,
  `data_jogo` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `resultados`
--

INSERT INTO `resultados` (`id`, `nome`, `equipe`, `pontos`, `acertos`, `erros`, `tempo`, `data_jogo`) VALUES
(1, 'mm', 'azul', 50, 5, 1, 5, '2026-09-30 04:26:02'),
(2, 'Teste', 'azul', 50, 5, 1, 5, '2026-09-30 04:31:18'),
(3, 'mm', 'vermelha', 60, 6, 0, 10, '2026-09-30 04:33:06'),
(4, 'mm', 'vermelha', 0, 0, 1, 5, '2026-09-30 04:36:21'),
(5, 'mm', 'azul', 110, 11, 4, 55, '2026-09-30 20:41:18'),
(6, 'matheus teste', 'azul', 100, 10, 5, 90, '2026-09-30 20:45:32');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessoes`
--

CREATE TABLE `sessoes` (
  `id` varchar(100) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `equipe` varchar(20) DEFAULT NULL,
  `nivel` varchar(20) DEFAULT NULL,
  `pontos` int(11) DEFAULT NULL,
  `acertos` int(11) DEFAULT NULL,
  `respondidas` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `tempo` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `ping` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT de tabela `ranking`
--
ALTER TABLE `ranking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
