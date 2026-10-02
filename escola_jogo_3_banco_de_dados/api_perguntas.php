<?php

header('Content-Type: application/json');

require_once 'config.php';

$nivel = $_GET['nivel'] ?? 'fundamental';

$sql = "
SELECT *
FROM perguntas
WHERE nivel = ?
ORDER BY RAND()
LIMIT 15
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $nivel);
$stmt->execute();

$result = $stmt->get_result();

$perguntas = [];

while ($row = $result->fetch_assoc()) {

    $mapaCorreta = [
        "A" => 0,
        "B" => 1,
        "C" => 2,
        "D" => 3
    ];

    $perguntas[] = [
        "id" => (int)$row["id"],
        "pergunta" => $row["pergunta"],
        "alternativas" => [
            $row["alternativa_a"],
            $row["alternativa_b"],
            $row["alternativa_c"],
            $row["alternativa_d"]
        ],
        "correta" => $mapaCorreta[strtoupper($row["correta"])]
    ];
}

echo json_encode($perguntas);