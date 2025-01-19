<!-- Bottom App Bar -->
<div class="bottom-app-bar" role="navigation" aria-label="Bottom Navigation">
    <!-- Global Mode: Default Bottom App Bar -->
    <div class="global-bottom-app-bar" id="globalBottomAppBar">
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
    </div>

    <!-- Map Mode: Bottom App Bar -->
    <div class="map-bottom-app-bar" id="mapBottomAppBar" style="display: none;">
        <!-- Navigation Drawer Button -->
        <button class="nav-icon" aria-label="Open Navigation Drawer">☰</button>

        <!-- Action Items -->
        <div class="action-items">
            <button class="action-item" aria-label="Add to Itinerary">
                <span class="material-symbols-outlined">event</span>
            </button>
            <button class="action-item" aria-label="Share">
                <span class="material-symbols-outlined">share</span>
            </button>
        </div>

        <!-- Floating Action Button (FAB) -->
        <button class="fab" id="mapFab" aria-label="Directions">
            <img src="/public/images/directions_alt_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="FAB Icon">
        </button>

        <!-- Menu Button and Slider -->
        <button id="menuButton" aria-label="Menu">
            <img src="/public/images/arrow_menu_open_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="Menu Icon">
        </button>
        <div class="zoom-slider">
            <img src="/public/images/Slider-AdobeStock_595737876.svg" alt="Zoom Slider Icon">
            <input type="range" id="zoomSlider" min="1" max="20" value="10">
        </div>
        <button id="zoomOutButton" aria-label="Zoom Out">
            <span class="material-icons">zoom_out_map</span>
        </button>
    </div>
</div>






