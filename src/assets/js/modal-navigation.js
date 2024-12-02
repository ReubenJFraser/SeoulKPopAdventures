// modal-navigation.js: Handles modal and navigation logic

document.addEventListener('DOMContentLoaded', () => {
  // Array to keep track of the history of locations visited
  let historyStack = [];
  let currentIndex = -1;  // To keep track of the current location in the history stack

  // Function to open the Bulma Modal with content
  function openBulmaModal(location) {
      const modal = document.getElementById('bulmaMapModal');

      // Update modal title and description dynamically based on the location data
      document.getElementById('modal-title').textContent = `${location.RestaurantName_English} (${location.RestaurantName_Korean})`;
      document.getElementById('modal-description').innerHTML = `
        <img src="/dist/images/restaurants/${location.ImageURL}" alt="${location.RestaurantName_English}" class="popup-image">
        <p>${location.Description}</p>
        <p>${location.Address}</p>
        <p>Contact: ${location.Telephone}</p>
        <p>Cuisine: ${location.CuisineCategory}</p>
        <div class="ratings">
          <div class="tripadvisor-rating">
            <strong>TripAdvisor Rating: </strong>
            <a href="${location.TripAdvisorLink}" target="_blank" class="rating-button">
              ${generateStars(location.TripAdvisorRating, 5)}
            </a>
          </div>
          <div class="michelin-rating">
            <strong>Michelin Rating: </strong>
            <a href="${location.MichelinGuideLink}" target="_blank" class="rating-button">
              ${generateStars(location.MichelinGuideRating, 3)}
            </a>
          </div>
        </div>
      `;

      // Update the history stack and current index
      if (currentIndex === historyStack.length - 1 || currentIndex === -1) {
          historyStack.push(location);  // Add the new location to the history stack
          currentIndex++;
      } else {
          historyStack = historyStack.slice(0, currentIndex + 1);  // Trim forward history if going back
          historyStack.push(location);
          currentIndex++;
      }

      modal.classList.add('is-active', 'modal-fx-fadeInScale');

      // Enable or disable navigation buttons based on the history stack
      updateNavigationButtons();
  }

  // Function to generate star icons for ratings
  function generateStars(rating, maxStars) {
      let starsMarkup = '';
      let remainingRating = rating;

      for (let i = 0; i < Math.floor(rating); i++) {
          starsMarkup += '<span class="material-icons" style="color: #FFD700;">star</span>';
          remainingRating--;
      }

      if (remainingRating >= 0.5) {
          starsMarkup += '<span class="material-icons" style="color: #FFD700;">star_half</span>';
      }

      const emptyStars = maxStars - Math.ceil(rating);
      for (let i = 0; i < emptyStars; i++) {
          starsMarkup += '<span class="material-icons" style="color: #E0E0E0;">star_outline</span>';
      }

      return starsMarkup;
  }

  // Function to navigate to the previous location (back)
  function navigateBack() {
      if (currentIndex > 0) {
          currentIndex--;
          const prevLocation = historyStack[currentIndex];
          openBulmaModal(prevLocation);
      }
  }

  // Function to navigate to the next location (forward)
  function navigateForward() {
      if (currentIndex < historyStack.length - 1) {
          currentIndex++;
          const nextLocation = historyStack[currentIndex];
          openBulmaModal(nextLocation);
      }
  }

  // Function to go to the homepage
  function goHome() {
      // Adjust to your homepage logic
      window.location.href = '/';  // Or another URL for the homepage
  }

  // Function to open the history menu
  function openMenu() {
      // Open a dropdown or modal for showing the history of locations
      alert('History menu opened'); // Placeholder for history logic
  }

  // Function to update the state of the navigation buttons (enable/disable)
  function updateNavigationButtons() {
      const backButton = document.querySelector('#bulmaMapModal .button.is-small[onclick="navigateBack()"]');
      const forwardButton = document.querySelector('#bulmaMapModal .button.is-small[onclick="navigateForward()"]');

      // Enable or disable the back/forward buttons based on the current index
      if (backButton && forwardButton) {
          backButton.disabled = currentIndex <= 0;
          forwardButton.disabled = currentIndex >= historyStack.length - 1;
      } else {
          console.warn('Navigation buttons not found.');
      }
  }

  // Function to close the Bulma Modal
  function closeBulmaModal() {
      const modal = document.getElementById('bulmaMapModal');
      modal.classList.remove('is-active', 'modal-fx-fadeInScale');
  }

  // Add event listeners to close the modal
  document.querySelectorAll('.modal-background, .delete, #cancel-btn').forEach(element => {
      element.addEventListener('click', () => {
          closeBulmaModal();
      });
  });

  // Make open and close functions globally accessible if needed
  window.openBulmaModal = openBulmaModal;
  window.closeBulmaModal = closeBulmaModal;
});









  
