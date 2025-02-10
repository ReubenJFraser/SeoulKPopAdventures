<!-- Updated navbar.php: Modular and Context-Sensitive Navigation Bar -->

<nav class="navbar is-fixed-top is-light">
    <div class="container">
        <!-- Left Section: Brand/Home Button -->
        <div class="navbar-brand">
            <a class="navbar-item" href="/" aria-label="Home">
                <span class="material-symbols-outlined">home</span>
            </a>
            <!-- Hamburger Menu for Mobile View -->
            <a role="button" class="navbar-burger" id="navbarBurger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <!-- Center Section: Map-Specific Context -->
        <div class="navbar-menu">
            <div class="navbar-start">
                <p class="navbar-item" id="mapContext">
                    Explore Map
                </p>
            </div>
        </div>

        <!-- Right Section: Action Buttons -->
        <div class="navbar-end">
            <div class="navbar-item">
                <button class="button is-small is-light" id="backButton" aria-label="Back" disabled>
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <button class="button is-small is-light" id="forwardButton" aria-label="Forward" disabled>
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <button class="button is-small is-light" id="expandMapButton" aria-label="Expand">
                    <span class="material-symbols-outlined">fullscreen</span>
                </button>
                <button class="button is-small is-light" id="closeMapButton" aria-label="Close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    </div>
</nav>


  