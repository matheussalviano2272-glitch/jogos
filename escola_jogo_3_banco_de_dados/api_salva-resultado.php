<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once 'config.php';

header('Content-Type: application/json');

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    file_put_contents(
        "dados_recebidos.txt",
        print_r($dados, true)
    );

    $stmt = $conn->prepare("
        INSERT INTO resultados
        (nome,equipe,pontos,acertos,erros,tempo)
        VALUES (?,?,?,?,?,?)
    ");

    $stmt->bind_param(
        "ssiiii",
        $dados["nome"],
        $dados["equipe"],
        $dados["pontos"],
        $dados["acertos"],
        $dados["erros"],
        $dados["tempo"]
    );

    $stmt->execute();

    echo json_encode([
        "sucesso" => true,
        "id" => $conn->insert_id
    ]);

} catch (Exception $e) {

    file_put_contents(
        "erro_mysql.txt",
        $e->getMessage()
    );

    echo json_encode([
        "sucesso" => false,
        "erro" => $e->getMessage()
    ]);
}