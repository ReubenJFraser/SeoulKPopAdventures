// modal-navigation.js: Handles modal and navigation logic

// Import centralized state and functions
import { historyStack, currentIndex, updateNavigationButtons } from './centralized_state.js';

// Specific log for currentIndex
console.log("Imported currentIndex in modal-navigation.js:", currentIndex);

// General log for script load confirmation
console.log("modal-navigation.js loaded successfully."); 

// Broader log for imported state
console.log("Modal navigation imported state:", { currentIndex, historyStack });

// Named export for the function to open the Bulma Modal
export function openBulmaModal(location) {
    console.log("openBulmaModal function called.");

    const modal = document.getElementById('bulmaMapModal');
    if (!modal) {
        console.error(`Modal with ID "bulmaMapModal" not found.`);
        return;
    }

    // Update modal title and description dynamically based on the location data
    document.getElementById('modal-title').textContent = `${location.RestaurantName_English} (${location.RestaurantName_Korean})`;
    document.getElementById('modal-description').innerHTML = `
        <img src="/images/restaurants/${location.ImageURL}" alt="${location.RestaurantName_English}" class="popup-image">
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
        historyStack.push(location); // Add the new location to the history stack
        currentIndex++;
    } else {
        historyStack = historyStack.slice(0, currentIndex + 1); // Trim forward history if going back
        historyStack.push(location);
        currentIndex++;
    }

    modal.classList.add('is-active', 'modal-fx-fadeInScale');

    // Enable or disable navigation buttons based on the history stack
    updateNavigationButtons();
}

// Named export for the function to close the Bulma Modal
export function closeBulmaModal() {
    console.log("closeBulmaModal function called.");
    const modal = document.getElementById('bulmaMapModal');
    if (modal) {
        modal.classList.remove('is-active', 'modal-fx-fadeInScale');
    } else {
        console.error('Modal element not found when attempting to close.');
    }
}

// Function to generate star icons for ratings (this does not need to be exported)
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
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired - adding event listeners to close modal.");
    document.querySelectorAll('.modal-background, .delete, #cancel-btn').forEach(element => {
        element.addEventListener('click', () => {
            closeBulmaModal();
        });
    });
});
















  
