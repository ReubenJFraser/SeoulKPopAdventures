// sidebar.js: Manages sidebar interactions (Report & Itinerary)

console.log("✅ sidebar.js loaded");

// Function to initialize sidebar event listeners
export function initializeSidebar() {
    console.log("📂 Initializing sidebar buttons...");

    const reportButton = document.getElementById("report-button");
    const itineraryButton = document.getElementById("add-itinerary-button");
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) {
        console.error("❌ Sidebar element not found.");
        return;
    }

    // Report Button Functionality
    if (reportButton) {
        reportButton.addEventListener("click", () => {
            console.log("📝 Report button clicked.");
            // Future: Implement reporting functionality
        });
    } else {
        console.error("❌ Report button not found.");
    }

    // Add to Itinerary Button Functionality
    if (itineraryButton) {
        itineraryButton.addEventListener("click", () => {
            console.log("📅 Add to Itinerary button clicked.");
            // Future: Implement itinerary functionality
        });
    } else {
        console.error("❌ Itinerary button not found.");
    }
}

// Sidebar Toggle Function
export function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        console.error("❌ Sidebar element not found.");
        return;
    }

    sidebar.classList.toggle("active");
    console.log(`📂 Sidebar ${sidebar.classList.contains("active") ? "opened" : "closed"}.`);
}

// Ensure sidebar functions are available after DOM loads
document.addEventListener("DOMContentLoaded", initializeSidebar);
