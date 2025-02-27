// marker-modal.js: Aligns modal navigation with footer updates

import { historyStack, currentIndex, updateNavigationButtons } from './centralized_state.js';
import { updateRestaurantDetails } from './restaurant-window.js';

// Import Sidebar (conditionally enabled)
import { initializeSidebar, toggleSidebar } from './sidebar.js';

try {
    if (document.getElementById('sidebar-container')) {
        initializeSidebar();
    }
} catch (error) {
    console.warn("⚠️ Sidebar initialization skipped (not yet implemented).");
}

// Function to determine correct bookmark icon based on state
function getBookmarkIcon(bookmarkState) {
    switch (bookmarkState) {
        case 'bookmark_add':
            return "/images/icons/google_material/bookmark_add_24dp.svg";
        case 'bookmark_added':
            return "/images/icons/google_material/bookmark_added_24dp.svg";
        case 'bookmark_remove':
            return "/images/icons/google_material/bookmark_remove_24dp.svg";
        default:
            return "/images/icons/google_material/bookmark_24dp.svg";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ marker-modal.js loaded");

    // Check modal element
    const modal = document.getElementById('bulmaMapModal');
    if (!modal) {
        console.error("❌ Modal with ID 'bulmaMapModal' not found.");
    }

    // Conditionally enable sidebar when implemented
    if (typeof toggleSidebar === 'function' && document.getElementById('sidebar-container')) {
        console.log("📌 Sidebar is currently disabled.");
        // toggleSidebar(); // Uncomment when sidebar is ready
    }
});

// Open the modal and update content dynamically
export function openBulmaModal(location) {
    console.log("Opening modal with location data:", location); // Debugging log

    const modal = document.getElementById('bulmaMapModal');
    if (!modal) {
        console.error(`Modal with ID "bulmaMapModal" not found.`);
        return;
    }

    // Update modal title (Universal for all markers)
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
        modalTitle.textContent = `${location.Name_English || "Unknown"}${location.Name_Korean ? ` (${location.Name_Korean})` : ""}`;
    } else {
        console.error("❌ Modal title element not found.");
    }

    // Update modal image (Universal for all markers)
    const markerImage = document.getElementById('marker-image');
    if (markerImage) {
        markerImage.src = `/images/markers/${location.ImageURL}`;
        markerImage.alt = location.Name_English || "Marker Image";
        console.log("🖼️ Updated marker image:", markerImage.src);
    } else {
        console.error("❌ Marker image element not found.");
    }

    // Update modal description (Universal for all markers)
    const modalDescription = document.getElementById('modal-description');
    if (modalDescription) {
        modalDescription.innerHTML = `
            <p>${location.Description || "No description available."}</p>
            <p><strong>📍 Address:</strong> ${location.Address || "Not available"}</p>
            <p><strong>📞 Contact:</strong> ${location.Telephone || "Not available"}</p>
        `;
    } else {
        console.error("❌ Modal description element not found.");
    }

    // Ensure action buttons are in the image overlay (NOT in footer)
    const actionOverlay = document.getElementById('action-overlay');
    if (actionOverlay) {
        actionOverlay.innerHTML = `
            <button id="like-button" class="overlay-button">🤍</button>
            <button id="bookmark-button" class="overlay-button">
                <img src="${getBookmarkIcon(location.is_bookmarked)}" alt="Bookmark">
            </button>
            <button id="dislike-button" class="overlay-button">👎</button>
        `;
    } else {
        console.error("❌ Action overlay not found.");
    }  

    // Call restaurant-specific function if this is a restaurant marker
    if (location.Category === "restaurant") {
        updateRestaurantDetails(location);
    }

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

    console.log("✅ Modal successfully opened.");

    // Sidebar is currently disabled
    // toggleSidebar();
}

// Function to add event listeners for modal buttons
function addButtonListeners(location) {
    console.log("🔄 Adding event listeners for modal buttons.");

    // Like button logic (Three-state transition)
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');

    if (likeButton) {
        updateLikeIcon(likeButton, location);

        likeButton.addEventListener('click', () => {
            let action;
            if (!location.is_liked && !location.is_disliked) {
                action = 'like'; // Neutral → Liked ❤️
            } else if (location.is_liked) {
                action = 'unlike'; // Liked ❤️ → Neutral 🤍
            } else if (location.is_disliked) {
                action = 'like'; // Disliked 💔 → Liked ❤️
            }

            updateAction(location.ID, action, () => {
                location.is_liked = action === 'like';
                location.is_disliked = false;
                updateLikeIcon(likeButton, location);
                updateDislikeIcon(dislikeButton, location);
                console.log(`👍 Like button clicked: ${action.toUpperCase()}`);
            });
        });
    } else {
        console.error("❌ Like button not found.");
    }

    // Dislike button logic
    if (dislikeButton) {
        updateDislikeIcon(dislikeButton, location);

        dislikeButton.addEventListener('click', () => {
            let action = location.is_disliked ? 'undislike' : 'dislike';

            updateAction(location.ID, action, () => {
                location.is_disliked = action === 'dislike';
                location.is_liked = false; // Reset Like if Disliked
                updateDislikeIcon(dislikeButton, location);
                updateLikeIcon(likeButton, location);
                console.log(`👎 Dislike button clicked: ${action.toUpperCase()}`);
            });
        });
    } else {
        console.error("❌ Dislike button not found.");
    }
}

// Function to update the like button dynamically
function updateLikeIcon(likeButton, location) {
    likeButton.textContent = location.is_liked ? "❤️" : location.is_disliked ? "💔" : "🤍";
}

// Function to update the dislike button dynamically
function updateDislikeIcon(dislikeButton, location) {
    dislikeButton.style.color = location.is_disliked ? "yellow" : "gray";
}

// Ensure bookmark button exists before proceeding
if (bookmarkButton) {
    updateBookmarkIcon(bookmarkButton, location);

    // Hover effect for pre-action indicator
    bookmarkButton.addEventListener('mouseenter', () => {
        if (location.is_bookmarked === 'bookmark') {
            bookmarkButton.src = "/images/icons/google_material/bookmark_add_24dp.svg";
        } else if (location.is_bookmarked === 'bookmark_added') {
            bookmarkButton.src = "/images/icons/google_material/bookmark_remove_24dp.svg";
        }
    });

    bookmarkButton.addEventListener('mouseleave', () => {
        updateBookmarkIcon(bookmarkButton, location);
    });

    // Click event for bookmark toggle (4-state transition)
    bookmarkButton.addEventListener('click', () => {
        let action;
        if (location.is_bookmarked === 'bookmark') {
            action = 'bookmark_add'; // Default → Added
        } else if (location.is_bookmarked === 'bookmark_add') {
            action = 'bookmark_added'; // Added → Fully Bookmarked
        } else if (location.is_bookmarked === 'bookmark_added') {
            action = 'bookmark_remove'; // Fully Bookmarked → Preparing to Remove
        } else if (location.is_bookmarked === 'bookmark_remove') {
            action = 'bookmark'; // Reset to default state
        }

        updateAction(location.RestaurantID, action, () => {
            location.is_bookmarked = action; // Update state
            updateBookmarkIcon(bookmarkButton, location);
            console.log(`🔖 Bookmark button clicked: New state - ${location.is_bookmarked}`);
        });
    });
} else {
    console.error("❌ Bookmark button not found.");
}

    // 💰 Price Category Button (Handles Display & Tooltip)
    const priceButton = document.getElementById('price-button');
    if (priceButton) {
        updatePriceButton(priceButton, location.PriceCategory);

        priceButton.addEventListener('click', () => {
            togglePriceTooltip(location);
        });
    } else {
        console.error("❌ Price button not found.");
    }

    // Function to update the like button dynamically
    function updateLikeIcon(likeButton, location) {
        likeButton.textContent = location.is_liked ? "❤️" : location.is_disliked ? "💔" : "🤍";
}

    // Function to update the dislike button dynamically
    function updateDislikeIcon(dislikeButton, location) {
        dislikeButton.style.color = location.is_disliked ? "yellow" : "gray";
}

    // Function to update the price category button dynamically
    function updatePriceButton(priceButton, priceCategory) {
    const moneyBags = ["💰", "💰💰", "💰💰💰", "💰💰💰💰"];
        priceButton.textContent = moneyBags[Math.max(0, Math.min(priceCategory - 1, 3))]; // Ensure value is in range
        console.log(`💲 Updated price button: ${priceButton.textContent}`);
}

    // Function to toggle the price tooltip/modal
    function togglePriceTooltip(location) {
    const tooltip = document.getElementById("price-tooltip");
    if (!tooltip) {
        console.error("❌ Price tooltip element not found.");
        return;
    }
    
    tooltip.classList.toggle("visible");
    tooltip.innerHTML = `
        <p><strong>Price Calculation:</strong></p>
        <p>Based on AI analysis of external sources including TripAdvisor, Michelin Guide, and Google Maps.</p>
        <p><a href="${location.TripAdvisorLink}" target="_blank">TripAdvisor</a></p>
        <p><a href="${location.MichelinGuideLink}" target="_blank">Michelin Guide</a></p>
    `;
    console.log("💰 Price tooltip toggled.");
}

// Function to send actions to the API
function updateAction(ID, action, callback) {
    console.log(`📢 Sending API Request - Marker ID: ${ID}, Action: ${action}`);

    fetch('/seoul-kpop-adventures/api/markers/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: ID, action: action })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`✅ ${action} action successful.`);
                callback();
            } else {
                console.error(`❌ ${action} action failed:`, data.error);
            }
        })
        .catch(error => console.error('⚠️ API Request Failed:', error));
}

// Close the modal
export function closeBulmaModal() {
    const modal = document.getElementById('bulmaMapModal');
    if (modal) {
        modal.classList.remove('is-active');
        console.log("🛑 Modal closed.");
    } else {
        console.error("❌ Modal element not found when attempting to close.");
    }
}

// Add event listeners for modal interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log("🔄 Adding modal close event listeners.");
    document.querySelectorAll('.modal-background, .delete').forEach(element => {
        element.addEventListener('click', closeBulmaModal);
    });
});

