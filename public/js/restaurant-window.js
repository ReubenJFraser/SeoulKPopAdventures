// restaurant-window.js: Handles the behavior of restaurant windows (concise and expanded views)

document.addEventListener("DOMContentLoaded", () => {
    const restaurantWindow = document.getElementById("restaurant-window");
    
    if (restaurantWindow) {
        console.log("Restaurant window initialized.");

        // Toggle between concise and expanded views
        restaurantWindow.addEventListener("click", (event) => {
            if (restaurantWindow.classList.contains("expanded")) {
                restaurantWindow.classList.remove("expanded");
                console.log("Restaurant window collapsed to concise view.");
            } else {
                restaurantWindow.classList.add("expanded");
                console.log("Restaurant window expanded.");
            }
        });
    } else {
        console.warn("Restaurant window element not found.");
    }
});
