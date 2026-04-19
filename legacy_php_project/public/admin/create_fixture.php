<?php
require '../../config/db.php'; // Path to db.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $match_type = trim($_POST['match_type'] ?? ''); // From your form
    $date = trim($_POST['date'] ?? '');
    $time = trim($_POST['time'] ?? '');
    $stadium = trim($_POST['stadium'] ?? '');
    $imagepath_for_db = null; // This will store the path for the HTML

    if (!empty($_FILES['image']['name'])) {
        // Path to move the uploaded file
        $uploadDir = '../../uploads'; 
        
        $filename = time() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . '/' . $filename; 

        // Path to store in the database (for the <img> tag)
        $imagepath_for_db = '../uploads/' . $filename; 

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            // File uploaded successfully
        } else {
            $imagepath_for_db = null; // Failed upload
        }
    }

    if ($name && $match_type && $date && $time && $stadium) {

        try {
            // SQL uses 'competitor_logo'
            $sql = "INSERT INTO fixtures (name, match_type, date, time, stadium, competitor_logo) 
                    VALUES (:name, :match_type, :date, :time, :stadium, :competitor_logo)";
            
            $stmt = $pdo->prepare($sql);
            
            // Binding uses 'competitor_logo'
            $stmt->execute([
                ':name' => $name,
                ':match_type' => $match_type,
                ':date' => $date,
                ':time' => $time,
                ':stadium' => $stadium,
                ':competitor_logo' => $imagepath_for_db 
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