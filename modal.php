<!-- modal.html: Modal Component -->
<div id="popupModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <!-- New Navigation Bar Section: Fixed at the Top -->
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
  
      <!-- Modal Header (Below Navigation Bar) -->
      <header class="modal-card-head">
        <p class="modal-card-title">Popup Title</p>
        <button class="delete modal-close-button" aria-label="close"></button>
      </header>
  
      <!-- Modal Body -->
      <section class="modal-card-body">
        <div class="popup-buttons">
          <button class="button is-primary">Primary Action</button>
          <button class="button is-light">Secondary Action</button>
        </div>
      </section>
      
      <!-- Modal Footer -->
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success">Save changes</button>
          <button class="button modal-close-button">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
  