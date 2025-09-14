<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gre Fc's players</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="img/AVATA-GreFC.png">
    <link rel="stylesheet" href="style.css?v=2">
</head>

<body>
    <header class="navbar">

        <div class="container">

            <img class="logo" src="img/AVATA-GreFC.png" alt="logo of Gre FC">
            <nav>
                <a href="index.php">New</a>
                <a href="players.php">Player</a>
                <a href="club.php">Club</a>
                <!-- <a href="more.php">More</a> -->
            </nav>
        </div>
        <!-- close container -->

        <div class="auth-section">
            <span> <i class="fa-solid fa-globe"> </i> EN</span>
            <a href="#">Sign In</a>
        </div>
        <!-- close auth-section -->


    </header>



</body>

<section class="hero-player">
    <h1>MEET THE SQUAD</h1>
    <p>Get to know our's talented players</p>
</section>


<section class="player-wrap">
    <div class="filter-bar">
        <h3> <i class="fa-solid fa-sort"></i> Filter by position</h3>
        <div class="filter-button">
            <button class="filter-btn active" data-position="All">All players</button>
            <button class="filter-btn" data-position="Defender" >Defender</button>
            <button class="filter-btn"data-position="Midfielder">Midfielder</button>
            <button class="filter-btn"data-position="Attacker">Attacker</button>
            <button class="filter-btn"data-position="Goalkeeper">Goalkeeper</button>
        </div>

    
    <div class="player-grid">
        <div class="player-card">
            <div class="player-image">
                <img src="PlayerImage/Quan.jpg" alt="Le Minh Quan">
                <span class="player-number"> 12 </span>
            </div>

            <div class="player-infor">
                <H4>Le Minh Quan</H4>
                <p class="position" >Defender</p>
                <p> age <strong>20</strong> </p>
                <p> role <strong>president</strong> </p>
                <hr>
                <h5>Joined Club</h5>
                <div class="stats">
                <div><span>2023</span></div>
                </div>
            </div>
        </div>

        <div class="player-card">
            <div class="player-image">
                <img src="PlayerImage/Pho.jpg" alt="Nguyen Huu Hoang Pho">
                <span class="player-number"> 19 </span>
            </div>

            <div class="player-infor">
                <H4>Nguyen Huu Hoang Pho</H4>
                <p class="position" >Midfielder</p>
                <p> age <strong>20</strong> </p>
                <p> role <strong> vice president</strong> </p>
                <hr>
                <h5>Joined Club</h5>
                <div class="stats">
                <div><span>2023</span></div>
                </div>
            </div>
        </div>
        
    </div>

    </div>
    <!--close filter -->
</section>

<section class="hero-player">
    <h1>SUPPORT THE TEAM</h1>
    <p>Come and cheer on GreFC at our next match. Your support makes all the difference!</p>
    <div class="support-btn" >
    <a href="index.php" class="next-fix-btn" > <strong> OUR'S NEXT FIXTURE </strong></a>
    <a href="https://www.facebook.com/Grefc?locale=vi_VN" class="follow-btn" > <strong> FOLLOW US </strong></a>
    </div>
</section>

 <footer style="padding-top: 0;" >
        <div class="footer-bottom">
            <img class="footer-logo" src="img/AVATA-GreFC.png" alt="logo of Gre FC"> 
            <p>Greenwich Football Club Da Nang</p>
            <p>© 2025 GreFC. All rights reserved.</p>
            <p>Developed by <i class="fa-brands fa-github"></i> <a href="https://github.com/HoangPho2212">Hoang Pho</a></p>
        </div>
    </footer>

</html>