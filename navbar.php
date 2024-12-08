<!-- Updated navbar.php: Modular and Context-Sensitive Navigation Bar -->

<nav class="navbar is-fixed-top is-light">
    <div class="container">
        <!-- Brand/Home Button -->
        <div class="navbar-brand">
            <a class="navbar-item" href="/" aria-label="Home">
                <span class="material-symbols-outlined">home</span>
            </a>
            <!-- Hamburger menu for mobile view -->
            <a role="button" class="navbar-burger" id="navbarBurger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <!-- Navbar Menu for Additional Items -->
        <div class="navbar-menu" id="navbarMenu">
            <div class="navbar-start">
                <!-- General Website Menu -->
                <a class="navbar-item" href="#" aria-label="Menu">
                    <span class="material-symbols-outlined">menu_book</span> Menu
                </a>
                <a class="navbar-item" href="#" aria-label="History">
                    <span class="material-symbols-outlined">history</span> History
                </a>
            </div>

            <!-- Navigation Buttons: Visible in 'Map Mode' -->
            <div class="navbar-end">
                <div class="navbar-item">
                    <button class="button is-small is-light" id="zoomInButton" aria-label="Zoom In">
                        <span class="material-symbols-outlined">zoom_in</span>
                    </button>
                    <button class="button is-small is-light" id="zoomOutButton" aria-label="Zoom Out">
                        <span class="material-symbols-outlined">zoom_out</span>
                    </button>
                    <button class="button is-small is-light" id="expandModalButton" aria-label="Expand Modal">
                        <span class="material-symbols-outlined">fullscreen</span>
                    </button>
                    <button class="button is-small is-light" id="closeButton" aria-label="Close">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <!-- Map Navigation Controls (Back and Forward) -->
                <div class="navbar-item">
                    <button class="button is-small is-light" id="backButton" disabled aria-label="Back">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button class="button is-small is-light" id="forwardButton" disabled aria-label="Forward">
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                <!-- Menu Button for Additional Options -->
                <a class="navbar-item" href="#" aria-label="Additional Menu">
                    <span class="material-symbols-outlined">menu</span>
                </a>
            </div>
        </div>
    </div>
</nav>

<script src="../public/js/navbar.js" type="module"></script> <!-- Corrected navbar.js path -->

  