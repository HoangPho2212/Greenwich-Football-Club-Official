<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $match_type = trim($_POST['match_type'] ?? '');
    $date = trim($_POST['date'] ?? '');
    $time = trim($_POST['time'] ?? '');
    $stadium = trim($_POST['stadium'] ?? '');
    $image = null;

    if (!empty($_FILES['image']['name'])) {
        $uploadDir = '../uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = time() . '_' . basename($_FILES['image']['name']);
        $target = $uploadDir . $filename;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            $imagepath = $target;
        }
    }

    if ($name && $match_type && $date && $time && $stadium) {

        try {
            $sql = "INSERT INTO fixtures (name, match_type, date, time, stadium, image) 
                    VALUES (:name, :match_type, :date, :time, :stadium, :image)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':match_type' => $match_type,
                ':date' => $date,
                ':time' => $time,
                ':stadium' => $stadium,
                ':image' => $imagepath
            ]);

            header('Location: update.php');
            exit();
        } catch (PDOException $e) {
            echo " Database Error: " . $e->getMessage();
        }
    } else {
        echo "Please fill in all required fields.";
    }
}
