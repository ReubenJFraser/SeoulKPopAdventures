// modal-navigation.js: Handles modal and navigation logic

// Function to open the Bulma Modal with content
export function openBulmaModal(location) {
    const modal = document.getElementById('bulmaMapModal');
  
    // Update modal title and description dynamically based on the location data
    document.getElementById('modal-title').textContent = `${location.RestaurantName_English} (${location.RestaurantName_Korean})`;
    document.getElementById('modal-description').innerHTML = `
      <img src="images/restaurants/${location.ImageURL}" alt="${location.RestaurantName_English}" class="popup-image">
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
  
    modal.classList.add('is-active', 'modal-fx-fadeInScale');
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
  
  // Add event listeners to close the modal
  export function closeBulmaModal() {
    const modal = document.getElementById('bulmaMapModal');
    modal.classList.remove('is-active', 'modal-fx-fadeInScale');
  }
  
  document.querySelectorAll('.modal-background, .delete, #cancel-btn').forEach(element => {
    element.addEventListener('click', () => {
      closeBulmaModal();
    });
  });
  
