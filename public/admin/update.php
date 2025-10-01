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
            <!-- hidden toggle -->
            <input type="checkbox" id="addBtn" hidden>

            <div class="section-header">
                <h2>News Management</h2>
                <label for="addBtn" class="add-btn">+ Add News</label>
            </div>

            <form class="news-form">
                <div class="form-header">
                    <h3>Add New Article</h3>
                    <label for="addBtn" class="close-btn">&times;</label>
                </div>

                <label for="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="enter article..." required>

                <label for="content">Content:</label>
                <textarea id="content" name="content" placeholder="enter content..." required></textarea>

                <label for="image">News image</label>
                <input type="file" id="image" name="image">

                <button type="submit" class="submit-btn">Add Article</button>
            </form>
            <div class="update-card">No news articles yet. Add your first article above!</div>
        </div>

        <div class="tab-content" id="content2">

            <input type="checkbox" id="fixturebtn" hidden>

            <div class="section-header">
                <h2>Fixtures Management</h2>
                <label for="fixturebtn" class="add-btn"> Add Fixture</label>

            </div>

        <form class="fixture-form">
            <div class="form-header">
                <h3>Add New Article</h3>
                <label for="fixturebtn" class="close-btn">&times;</label>
            </div>

            <label for="date">Date:</label>
            <input type="date" id="date" name="date" placeholder="match date?" required>

            <label for="time">Time:</label>
            <input type="time" id="time" name="time" placeholder="match begin at?" required>

            <label for="name">Name:</label>
            <textarea id="name" name="name" placeholder="enter competitor name..." required></textarea>

            <label for="stadium">Stadium:</label>
            <input type="text" id="stadium" name="stadium" placeholder="Tuyen Son football field" required>

            <label for="match">Match-type:</label>
            <input type="match" id="match" name="match" placeholder="friendly match, GW Cup,..." required>

            <label for="image">Competitor Logo</label>
            <input type="file" id="image" name="image">

            <button type="submit" class="submit-btn">Add Fixture</button>
        </form>

        <div class="update-card">No fixtures scheduled. Add your first fixture above!</div>
    </div>

    <div class="tab-content" id="content3">

        <input type="checkbox" id="addplayerbtn" hidden>

        <div class="section-header">
            <h2>Players Management</h2>
            <label for="addplayerbtn" class="add-btn">Add Player</label>
        </div>

          <form class="player-form">
            <div class="form-header">
                <h3>Add New Player</h3>
                <label for="addplayerbtn" class="close-btn">&times;</label>
            </div>

            <label for="number">Number:</label>
            <input type="number" id="number" name="number" placeholder="player's number" required>

            <label for="age">Age:</label>
            <input type="number" id="age" name="age" placeholder="20" required>

            <label for="name">Name:</label>
            <textarea id="name" name="name" placeholder="Nguyen Huu Hoang Pho" required></textarea>

            <label for="position">Position:</label>
            <input type="text" id="position" name="position" placeholder="Midfielder" required>

            <label for="role">Role:</label>
            <input type="text" id="role" name="role" placeholder="Vice Precident" required>

            <label for="image">Profile photo</label>
            <input type="file" id="image" name="image">

            <label for="year">Joined club:</label>
            <input type="number" id="year" name="year" placeholder="2023" required>

            <button type="submit" class="submit-btn">Add Fixture</button>
        </form>
        <div class="update-card">No players added. Add your first player above!</div>


</body>

</html>