<?php
require '../config/db.php';

$stmt = $pdo->query("SELECT * FROM fixtures WHERE date >= CURDATE() ORDER BY date ASC LIMIT 1");
$fixture = $stmt->fetch(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gre FC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="../uploads/img/AVATA-GreFC.png">
    <link rel="stylesheet" href="../assets/style.css">
</head>

<body>
    <header class="navbar">

        <div class="container">

            <img class="logo" src="../uploads/img/AVATA-GreFC.png" alt="logo of Gre FC">
            <nav>
                <a href="../public/index.php">New</a>
                <a href="../public/players.php">Player</a>
                <a href="../public/club.php">Club</a>
                <a href="../public/admin/update.php">Update</a>
            </nav>
        </div>
        <!-- close container -->

        <div class="auth-section">
            <span> <i class="fa-solid fa-globe"> </i> EN</span>
            <a href="/public/admin/login.php" onclick="alert('Bạn không cần đăng nhập để sử dụng trang web. Chỉ Admin mới dùng chức năng này.'); return false;">Sign In</a>
            <a href="/public/admin/logout.php" >Sign out</a>
        </div>
        <!-- close auth-section -->


    </header>

    <!-- Hero-section -->
    <section class="hero">
        <div class="hero-left">
            <h1>WE ARE HONOR CLUB FROM UNIVERSITY OF GREENWICH</h1>
            <p>It’s our three term in a row achieving this label.</label></p>
        </div>

        <div class="matchup">
            <img src="../uploads/img/AVATA-GreFC.png" alt="Gre FC">
        </div>

        <div class="hero-right">
            <img src="../uploads/img/Gre Club.jpg" alt="clb members">
        </div>
    </section>

    <!-- Fixture Section -->
    <section class="fixture-section">
        <div class="fixture-container">
            <h2> NEXT FIXTURE</h2>
            <?php if ($fixture && is_array($fixture)): ?>
            <p><i class="fa-solid fa-calendar-days"></i>
                <?= strtoupper(date('D d M', strtotime($fixture['date']))) ?>
            </p>

            <div class="fixture-card">
                <img src="../uploads/img/AVATA-GreFC.png" alt="GreFC Logo">
                <span class="vs">VS</span>
                <img src="<?= htmlspecialchars($fixture['competitor_logo'] ?? '../uploads/img/opponent.png') ?>" alt="Opponent Logo">

                <p><strong><?= htmlspecialchars($fixture['name']) ?></strong></p>
                <p class="kickoff">
                    <i class="fa-solid fa-clock"></i>
                    <?= date('H:i', strtotime($fixture['time'])) ?> Kick-off
                </p>

                <p style="font-size: 14px;">
                    <?= htmlspecialchars($fixture['match_type']) ?> • <?= htmlspecialchars($fixture['stadium']) ?>
                </p>

                <!-- <form action="delete_fixture.php" method="POST" onsubmit="return confirm('Delete this fixture?')" style="margin-top:10px;">
                    <input type="hidden" name="id" value="<?= $fixture['id'] ?>">
                    <button type="submit" class="delete-btn">Delete</button>
                </form> -->
            </div>
            <?php else: ?>
            <p>No upcoming fixtures.</p>
            <?php endif; ?>
        </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <h2>JOIN THE GRE FC FAMILY</h2>
        <p>Experience university football at its finest. Follow GreFC's journey and beyond.</p>

        <div class="footer-bottom">
            <img class="footer-logo" src="../uploads/img/AVATA-GreFC.png" alt="logo of Gre FC">
            <p>Greenwich Football Club Da Nang</p>
            <p>© 2025 GreFC. All rights reserved.</p>
            <p>Developed by <i class="fa-brands fa-github"></i> <a href="https://github.com/HoangPho2212">Hoang Pho</a></p>
        </div>
    </footer>

</body>

</html>