<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css?v=2">
    <link rel="icon" href="img/AVATA-GreFC.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Admin Update</title>
</head>

<body>
    <header class="navbar">

        <div class="container">

            <img class="logo" src="img/AVATA-GreFC.png" alt="logo of Gre FC">
            <nav>
                <a href="index.php">New</a>
                <a href="players.php">Player</a>
                <a href="club.php">Club</a>
                <a href="update.php">Update</a>
            </nav>
        </div>
        <!-- close container -->

        <div class="auth-section">
            <span> <i class="fa-solid fa-globe"> </i> EN</span>
            <a href="#">Sign In</a>
        </div>
        <!-- close auth-section -->
    </header>

    <h1>ADMIN UPDATES 🔧</h1>
    <p class="subtitle">Manage news articles and fixtures for the homepage</p>

    <!-- Radio inputs -->
    <input type="radio" name="tab" id="tab1" checked>
    <label for="tab1" class="tab-label">News Management</label>

    <input type="radio" name="tab" id="tab2">
    <label for="tab2" class="tab-label">Fixtures Management</label>

    <input type="radio" name="tab" id="tab3">
    <label for="tab3" class="tab-label">Players Management</label>


    <!-- content -->
    <div class="tab-container">
        <div class="tab-content" id="content1">
            <div class="section-header">
                <h2>News Management</h2>
                <button class="add-btn">+ Add News</button>
            </div>
            <div class="update-card">No news articles yet. Add your first article above!</div>
        </div>

        <div class="tab-content" id="content2">
            <div class="section-header">
                <h2>Fixtures Management</h2>
                <button class="add-btn">+ Add Fixture</button>
            </div>
            <div class="update-card">No fixtures scheduled. Add your first fixture above!</div>
        </div>

        <div class="tab-content" id="content3">
            <div class="section-header">
                <h2>Players Management</h2>
                <button class="add-btn">+ Add Player</button>
            </div>
            <div class="update-card">No players added. Add your first player above!</div>

</body>

</html>