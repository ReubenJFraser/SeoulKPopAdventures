<!-- modal.html: Modal Component -->
<div id="bulmaMapModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <!-- Modal-specific Navigation Bar fixed inside the modal -->
        <div class="modal-nav-bar" id="modal-nav">
            <button class="button is-small nav-button" onclick="navigateBack()">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button class="button is-small nav-button" onclick="navigateForward()">
                <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button class="button is-small nav-button" onclick="goHome()">
                <span class="material-symbols-outlined">home</span>
            </button>
            <button class="button is-small nav-button" onclick="openMenu()">
                <span class="material-symbols-outlined">history</span>
            </button>
        </div>

        <!-- Modal Header (Map Marker Name) -->
        <header class="modal-card-head">
            <p id="modal-title" class="modal-card-title">Location Details</p>
            <button class="delete" aria-label="close" onclick="closeBulmaModal()"></button>
        </header>
        
        <!-- Modal Body (Details about the location) -->
        <section class="modal-card-body">
            <div id="modal-description"></div>
        </section>

        <!-- Modal Footer (Close button) -->
        <footer class="modal-card-foot">
            <button class="button is-success" onclick="closeBulmaModal()">Close</button>
        </footer>
    </div>
</div>



  