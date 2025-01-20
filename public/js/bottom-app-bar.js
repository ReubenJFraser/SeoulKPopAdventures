// bottom-app-bar.js: Handles functionality for the bottom app bar, including sliders and icons

console.log("bottom-app-bar.js initialized");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");

    const globalAppBar = document.getElementById("globalBottomAppBar");
    const mapAppBar = document.getElementById("mapBottomAppBar");
    const zoomSlider = document.getElementById("zoomSlider");
    const mapFab = document.getElementById("mapFab");
    const actionItems = document.querySelectorAll(".action-item");

    if (!globalAppBar || !mapAppBar || !zoomSlider) {
        console.error("Error: Required elements are missing");
        return;
    }

    console.log("App bar elements located:", { globalAppBar, mapAppBar, zoomSlider });

    // Default states
    const zoomLevels = ["City", "District", "3D", "Street View"];
    let isMapMode = true; // Start in map mode

    /**
     * Toggles between global app bar and map-specific app bar.
     * @param {boolean} isMapMode - True for map mode, false for global mode.
     */
    function toggleAppBar(isMapMode) {
        globalAppBar.style.display = isMapMode ? "none" : "flex";
        mapAppBar.style.display = isMapMode ? "flex" : "none";
        console.log(`App bar state updated: Global=${globalAppBar.style.display}, Map=${mapAppBar.style.display}`);
    }

    // Initialize app bar state
    toggleAppBar(isMapMode);

    // Create and style slider label dynamically
    const sliderLabel = document.createElement("div");
    sliderLabel.id = "sliderLabel";
    sliderLabel.style.position = "absolute";
    sliderLabel.style.top = "-24px";
    sliderLabel.style.left = "50%";
    sliderLabel.style.transform = "translateX(-50%)";
    sliderLabel.style.background = "#6b2d72";
    sliderLabel.style.color = "#fff";
    sliderLabel.style.padding = "2px 6px";
    sliderLabel.style.borderRadius = "4px";
    sliderLabel.style.fontSize = "0.75rem";

    zoomSlider.parentElement.style.position = "relative";
    zoomSlider.parentElement.appendChild(sliderLabel);

    // Slider functionality
    zoomSlider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value, 10);
        const index = Math.floor((value - 10) / 3); // Map slider values to discrete stops
        sliderLabel.textContent = zoomLevels[index];
        console.log(`Zoom Level: ${zoomLevels[index]} (${value})`);

        // Apply active/inactive states to action items if needed
        actionItems.forEach((item, idx) => {
            item.classList.toggle("active", idx === index);
        });
    });

    zoomSlider.addEventListener("change", (e) => {
        console.log(`Zoom Level finalized: ${e.target.value}`);
    });

    // Initialize slider label
    zoomSlider.dispatchEvent(new Event("input"));

    // FAB functionality
    if (mapFab) {
        mapFab.addEventListener("click", () => {
            console.log("FAB clicked");
            // Implement FAB functionality (e.g., opening navigation)
        });
    } else {
        console.warn("FAB element not found.");
    }

    // Action item hover/active functionality
    actionItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.querySelector(".material-symbols-outlined").classList.add("hover");
        });

        item.addEventListener("mouseout", () => {
            item.querySelector(".material-symbols-outlined").classList.remove("hover");
        });

        item.addEventListener("click", () => {
            actionItems.forEach((otherItem) =>
                otherItem.querySelector(".material-symbols-outlined").classList.remove("active")
            );
            item.querySelector(".material-symbols-outlined").classList.add("active");
        });
    });
});







