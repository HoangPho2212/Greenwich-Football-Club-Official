<?php

include '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $number = trim($_POST['number'] ?? null);
    $age = trim($_POST['age'] ?? null);
    $position = trim($_POST['position'] ?? '');
    $role = trim($_POST['role'] ?? '');
    $joined_year = trim($_POST['joined_year'] ?? null);
    $imagepath_for_db = null; // This will store the path for the HTML


    if (!empty($_FILES['image']['name'])) {
        $uploadDir = '../../uploads/PlayersImage';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = time() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . '/' . $filename;

        $imagepath_for_db = '../uploads/PlayersImage/' . $filename;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $imagepath_for_db = null; // Failed upload
        }
    }

    if ($name && $position) {
        try {
            $sql = "INSERT INTO players (name, number, age, position, role, joined_year, profile_photo) 
                VALUES (:name, :number, :age, :position, :role, :joined_year, :profile_photo)";

            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                ':name' => $name,
                ':number' => $number,
                ':age' => $age,
                ':position' => $position,
                ':role' => $role,
                ':joined_year' => $joined_year,
                ':profile_photo' => $imagepath_for_db
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
