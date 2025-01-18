<!-- Updated modal.php: Modal Component -->
<div id="bulmaMapModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <!-- Modal Header (Map Marker Name) -->
        <header class="modal-card-head">
            <p id="modal-title" class="modal-card-title">Location Details</p>
            <!-- Unified ID for the Close Button in the Header -->
            <button class="delete" aria-label="close" id="closeModalButton"></button>
        </header>

        <!-- Modal Body (Details about the location) -->
        <section class="modal-card-body">
            <!-- Image Section -->
            <div class="modal-image">
                <img id="restaurant-image" src="" alt="Restaurant Image" class="popup-image">
            </div>

            <!-- Description Section -->
            <div id="modal-description"></div>
        </section>

        <!-- Modal Footer (Close button) -->
        <footer class="modal-card-foot">
            <button class="button is-success" id="closeModalButton">Close</button>
        </footer>

        <!-- Bottom App Bar (New Addition) -->
        <div class="bottom-app-bar" role="navigation" aria-label="Bottom Navigation">
            <button class="nav-icon" aria-label="Open Navigation Drawer">☰</button>
            <div class="action-items">
                <button class="action-item" aria-label="Action 1">Action 1</button>
                <button class="action-item" aria-label="Action 2">Action 2</button>
            </div>
            <button class="fab" aria-label="Add New Item">+</button>
        </div>
    </div>
</div>







  