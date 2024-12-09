// navbar.js: Handles the logic for the navbar interactions and centralized navigation and modal handling
import { historyStack, currentIndex, updateNavigationButtons } from './centralized_state.js';

console.log("Imported currentIndex in navbar.js:", currentIndex);

// Event Listeners for Navigation and Modal Handling
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    // Burger Menu Toggle Logic
    const burgerIcon = document.getElementById('navbarBurger');
    const navbarMenu = document.getElementById('navbarMenu');
    if (burgerIcon && navbarMenu) {
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }

    // Close Modal Event Listeners
    document.querySelectorAll('.modal-background, .delete, #cancel-btn, #closeModalButton').forEach(element => {
        element.addEventListener('click', () => {
            closeBulmaModal();
        });
    });

    // Update the Navigation Buttons State Initially
    updateNavigationButtons();
});

// Centralized Modal Handling Functions
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

    modal.classList.add('is-active', 'modal-fx-fadeInScale');
    updateNavigationButtons(); // Update the buttons state after opening the modal

    // Update History Stack
    if (currentIndex === historyStack.length - 1 || currentIndex === -1) {
        historyStack.push(location);
        currentIndex++;
    } else {
        historyStack = historyStack.slice(0, currentIndex + 1);
        historyStack.push(location);
        currentIndex++;
    }
}

export function closeBulmaModal() {
    console.log("closeBulmaModal function called.");
    const modal = document.getElementById('bulmaMapModal');
    if (modal) {
        modal.classList.remove('is-active', 'modal-fx-fadeInScale');
    } else {
        console.error('Modal element not found when attempting to close.');
    }
}

// Generate Star Icons for Ratings
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

// Navigation Control Functions
export function navigateBack() {
    console.log("navigateBack function called.");
    if (currentIndex > 0) {
        currentIndex--;
        const prevLocation = historyStack[currentIndex];
        openBulmaModal(prevLocation);
    }
    updateNavigationButtons();
}

export function navigateForward() {
    console.log("navigateForward function called.");
    if (currentIndex < historyStack.length - 1) {
        currentIndex++;
        const nextLocation = historyStack[currentIndex];
        openBulmaModal(nextLocation);
    }
    updateNavigationButtons();
}

export function goHome() {
    console.log("goHome function called.");
    window.location.href = '/';
}

export function openMenu() {
    console.log("openMenu function called.");
    alert('History menu opened');
}

// Event Listener for Map Markers (Moved from modal-navigation.js)
export function initializeMapMarkerListeners(map, locations) {
    locations.forEach((location, index) => {
        const latitude = parseFloat(location.Latitude);
        const longitude = parseFloat(location.Longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            console.error(`Invalid coordinates for location ${index}: (${latitude}, ${longitude})`);
            return;
        }

        const coordinates = [longitude, latitude];
        const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);

        marker.getElement().addEventListener('click', () => {
            console.log(`Marker at coordinates ${coordinates} clicked.`);
            if (coordinates && coordinates.length === 2) {
                map.flyTo({
                    center: coordinates,
                    zoom: 15,
                    speed: 1.5,
                    curve: 1
                });
                map.on('moveend', () => {
                    console.log('After flyTo:', 'New Map Center:', map.getCenter(), 'New Zoom Level:', map.getZoom());
                });
                openBulmaModal(location);
                historyStack.push(location);
                currentIndex++;
            }
        });
    });
}






