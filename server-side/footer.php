<!-- Updated footer.php: Footer Component with Customizable Menu and Zoom Slider -->
<footer class="footer" id="regularFooter">
    <div class="content has-text-centered">
      <p>
        <strong>Seoul K-Pop Adventures</strong> by <a href="#">Your Name</a>. All rights reserved.
      </p>
      <p>
        <a href="#contact">
          <span class="material-symbols-outlined">contact_mail</span> Contact Us
        </a>
      </p>
    </div>
</footer>

<footer class="footer map-mode-footer" id="mapFooter" style="display: none;">
    <div class="button-container">
        <!-- Customizable Menu Button -->
        <button class="button menu" id="menuButton">
            <span class="material-symbols-outlined">arrow_menu_open</span>
        </button>
        <div class="menu-dropdown" id="menuDropdown" style="display: none;">
            <ul id="favoritesList">
                <!-- Dynamically populated favorite locations -->
            </ul>
        </div>

        <!-- Zoom Slider -->
        <div class="zoom-slider">
            <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="25" x2="180" y2="25" stroke="gray" stroke-width="4" />
                <circle id="slider-handle" cx="100" cy="25" r="10" fill="blue" />
            </svg>
        </div>

        <!-- Zoom Out Button -->
        <button class="button zoom-out" id="zoomOutButton">
            <span class="material-symbols-outlined">zoom_out_map</span>
        </button>
    </div>
</footer>


  