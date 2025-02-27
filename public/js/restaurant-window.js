// restaurant-window.js: Handles restaurant-specific modal functionality

console.log("✅ restaurant-window.js loaded");

// Function to update the restaurant modal with restaurant-specific details
export function updateRestaurantDetails(location) {
    console.log("🍽️ Updating restaurant details for:", location.RestaurantName_English);

    // Get modal elements
    const modalDescription = document.getElementById('modal-description');
    const tripAdvisorContainer = document.getElementById('tripadvisor-container');
    const michelinContainer = document.getElementById('michelin-container');
    const cuisineInfo = document.getElementById('restaurant-cuisine');
    const openingHours = document.getElementById('restaurant-hours');
    const awardsInfo = document.getElementById('restaurant-awards');

    // Update description (already handled in marker-modal.js but added for clarity)
    if (modalDescription) {
        modalDescription.innerHTML = `
            <p>${location.Description || "No description available."}</p>
            <p><strong>🏠 Address:</strong> ${location.Address || "Not available"}</p>
            <p><strong>📞 Contact:</strong> ${location.Telephone || "Not available"}</p>
        `;
    } else {
        console.error("❌ Modal description element not found.");
    }

    // Update TripAdvisor Rating with Elevated Button
    if (tripAdvisorContainer) {
        tripAdvisorContainer.innerHTML = `
            <div class="rating-container">
                <div class="rating-label">TripAdvisor</div>
                <elevated-button class="rating-button" 
                    onclick="window.open('${location.TripAdvisorLink || "#"}', '_blank')">
                    ${generateTripAdvisorStars(location.TripAdvisorRating)}
                </elevated-button>
            </div>
        `;
    } else {
        console.error("❌ TripAdvisor rating container not found.");
    }

    // Update Michelin Guide Rating with Elevated Button
    if (michelinContainer) {
        michelinContainer.innerHTML = `
            <div class="rating-container">
                <div class="rating-label">Michelin Guide</div>
                <elevated-button class="rating-button" 
                    onclick="window.open('${location.MichelinGuideLink || "#"}', '_blank')">
                    ${generateMichelinStars(location.MichelinGuideRating)}
                </elevated-button>
            </div>
        `;
    } else {
        console.error("❌ Michelin rating container not found.");
    }

    // Update Cuisine Information 🍽️
    if (cuisineInfo) {
        cuisineInfo.innerHTML = `<strong>🍽️ Cuisine:</strong> ${location.CuisineCategory || "Not available"}`;
    } else {
        console.error("❌ Cuisine info element not found.");
    }

    // Update Opening Hours ⏰
    if (openingHours) {
        openingHours.innerHTML = `<strong>⏰ Hours:</strong> ${location.Hours || "Not available"}`;
    } else {
        console.error("❌ Opening hours element not found.");
    }

    // Update Awards & Recognitions 🏆
    if (awardsInfo) {
        awardsInfo.innerHTML = location.Awards ? `<strong>🏆 Awards:</strong> ${location.Awards}` : "No awards listed.";
    } else {
        console.error("❌ Awards info element not found.");
    }

    console.log("✅ Restaurant details updated successfully.");
}

// Function to generate TripAdvisor star rating
function generateTripAdvisorStars(rating) {
    if (!rating) return "No rating available";
    
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += "⭐"; // Full star
        } else if (rating >= i - 0.5) {
            stars += "✴️"; // Half star
        } else {
            stars += "☆"; // Empty star
        }
    }
    return stars;
}

// Function to generate Michelin Guide rating with image
function generateMichelinStars(rating) {
    if (!rating) return "Not listed in Michelin Guide";

    let imagePath = "";
    let altText = "Michelin Guide";

    if (rating === "Bib Gourmand") {
        imagePath = "/images/icons/Michelin_Guide/Michelin_Guide-Bib_Gourmand.png";
        altText = "Michelin Bib Gourmand";
    } else if (rating === "Green Star") {
        imagePath = "/images/icons/Michelin_Guide/Michelin_Guide-Green_Star.png";
        altText = "Michelin Green Star";
    } else if (rating >= 1 && rating <= 3) {
        imagePath = "/images/icons/Michelin_Guide/Michelin_Guide-Star_Rating.png";
        altText = `Michelin ${rating} Stars`;
    }

    return `<img src="${imagePath}" alt="${altText}" class="michelin-icon">`;
}

