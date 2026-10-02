<?php

header('Content-Type: application/json');

require_once 'config.php';

$sql = "
SELECT *
FROM ranking
ORDER BY pontos DESC
LIMIT 20
";

$result = $conn->query($sql);

$ranking = [];

while ($row = $result->fetch_assoc()) {
    $ranking[] = $row;
}

echo json_encode($ranking);