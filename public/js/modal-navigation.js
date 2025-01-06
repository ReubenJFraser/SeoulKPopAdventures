// modal-navigation.js: Aligns modal navigation with footer updates

import { historyStack, currentIndex, updateNavigationButtons } from './centralized_state.js';

// Open the modal and update content dynamically
export function openBulmaModal(location) {
    console.log("Opening modal with location data:", location); // Debugging log

    const modal = document.getElementById('bulmaMapModal');
    if (!modal) {
        console.error(`Modal with ID "bulmaMapModal" not found.`);
        return;
    }

    // Update modal general content
    document.getElementById('modal-title').textContent = `${location.RestaurantName_English} (${location.RestaurantName_Korean})`;
    document.getElementById('modal-description').innerHTML = `
        <img src="/bulma-test/images/restaurants/${location.ImageURL}" alt="${location.RestaurantName_English}" class="popup-image">
        <p>${location.Description}</p>
        <p>${location.Address}</p>
        <p>Contact: ${location.Telephone}</p>
        <p>Cuisine: ${location.CuisineCategory}</p>
    `;

    // Add footer buttons dynamically
    const footerHTML = `
        <div class="modal-footer">
            <button id="like-button" class="modal-button">🤍</button>
            <button id="bookmark-button" class="modal-button">🔖</button>
            <button id="block-button" class="modal-button">👎</button>
            <!-- Commented out lower-priority buttons -->
            <!-- <button id="report-button" class="modal-button">📝</button> -->
            <!-- <button id="add-itinerary-button" class="modal-button">📅</button> -->
        </div>
    `;
    document.getElementById('modal-description').insertAdjacentHTML('beforeend', footerHTML);

    // Update button states dynamically
    updateButtonState('like-button', location.is_liked);
    updateButtonState('bookmark-button', location.is_bookmarked);
    updateButtonState('block-button', location.is_blocked);

    // Add event listeners to buttons
    addButtonListeners(location);

    // Update history stack
    let updatedIndex = currentIndex;
    if (updatedIndex === historyStack.length - 1 || updatedIndex === -1) {
        historyStack.push(location);
        updatedIndex++;
    } else {
        historyStack.splice(updatedIndex + 1);
        historyStack.push(location);
        updatedIndex++;
    }

    modal.classList.add('is-active');
    updateNavigationButtons();
}

// Function to update button states dynamically
function updateButtonState(buttonId, state) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (state) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

// Function to add event listeners for buttons
function addButtonListeners(location) {
    // Like button: toggles between 🤍, ❤️, and 💔
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
        likeButton.addEventListener('click', () => {
            const action = location.is_liked ? 'unlike' : 'like';
            updateAction(location.RestaurantID, action, () => {
                location.is_liked = !location.is_liked;
                likeButton.textContent = location.is_liked ? '❤️' : '🤍';
                updateButtonState('like-button', location.is_liked);
            });
        });
    }

    // Bookmark button: toggles between bookmarked and unbookmarked states
    const bookmarkButton = document.getElementById('bookmark-button');
    if (bookmarkButton) {
        bookmarkButton.addEventListener('click', () => {
            const action = location.is_bookmarked ? 'bookmark_remove' : 'bookmark_add';
            updateAction(location.RestaurantID, action, () => {
                location.is_bookmarked = !location.is_bookmarked;
                updateButtonState('bookmark-button', location.is_bookmarked);
            });
        });
    }

    // Block button: toggles between blocked and unblocked states
    const blockButton = document.getElementById('block-button');
    if (blockButton) {
        blockButton.addEventListener('click', () => {
            const action = location.is_blocked ? 'unblock' : 'block';
            updateAction(location.RestaurantID, action, () => {
                location.is_blocked = !location.is_blocked;
                updateButtonState('block-button', location.is_blocked);
            });
        });
    }

    // Commented out event listeners for lower-priority buttons
    /*
    const reportButton = document.getElementById('report-button');
    if (reportButton) {
        reportButton.addEventListener('click', () => {
            updateAction(location.RestaurantID, 'report', () => {
                console.log('Reported successfully.');
            });
        });
    }

    const addItineraryButton = document.getElementById('add-itinerary-button');
    if (addItineraryButton) {
        addItineraryButton.addEventListener('click', () => {
            const action = location.is_in_itinerary ? 'remove_from_itinerary' : 'add_to_itinerary';
            updateAction(location.RestaurantID, action, () => {
                location.is_in_itinerary = !location.is_in_itinerary;
                updateButtonState('add-itinerary-button', location.is_in_itinerary);
            });
        });
    }
    */
}

// Function to send actions to the API
function updateAction(restaurantID, action, callback) {
    fetch('/public/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant_id: restaurantID, action: action })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`${action} action successful.`);
                callback();
            } else {
                console.error(`${action} action failed:`, data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Close the modal
export function closeBulmaModal() {
    const modal = document.getElementById('bulmaMapModal');
    if (modal) {
        modal.classList.remove('is-active');
    } else {
        console.error('Modal element not found when attempting to close.');
    }
}

// Add event listeners for modal interactions
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-background, .delete').forEach(element => {
        element.addEventListener('click', closeBulmaModal);
    });
});






















  
