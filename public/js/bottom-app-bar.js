// bottom-app-bar.js: Handles functionality for the bottom app bar, including sliders and icons

console.log("bottom-app-bar.js initialized");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");

    const globalAppBar = document.getElementById("globalBottomAppBar");
    const mapAppBar = document.getElementById("mapBottomAppBar");
    const zoomSlider = document.getElementById("zoomSlider");
    const mapFab = document.getElementById("mapFab");
    const sidebar = document.getElementById("sidebar");
    const sliderLabel = document.getElementById("sliderLabel");
    const actionItems = document.querySelectorAll(".action-item");

    if (!globalAppBar || !mapAppBar || !zoomSlider || !mapFab || !sidebar || !sliderLabel) {
        console.error("Error: Required elements are missing");
        return;
    }

    console.log("App bar elements located:", { globalAppBar, mapAppBar, zoomSlider, mapFab, sidebar });

    // Default states
    const zoomLevels = ["City", "District", "3D", "Street View"];
    let isMapMode = true; // Start in map mode
    let isSliderOpen = false; // Track if sidebar is open

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

    // Smooth Zoom Slider Animations
    zoomSlider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value, 10);
        const index = Math.floor((value - 10) / 3); // Map slider values to discrete stops
        sliderLabel.textContent = zoomLevels[index];
        sliderLabel.classList.add("visible"); // Fade in label
        console.log(`Zoom Level: ${zoomLevels[index]} (${value})`);

        // Apply active/inactive states to action items if needed
        actionItems.forEach((item, idx) => {
            item.classList.toggle("active", idx === index);
        });
    });

    zoomSlider.addEventListener("change", (e) => {
        console.log(`Zoom Level finalized: ${e.target.value}`);
        setTimeout(() => sliderLabel.classList.remove("visible"), 800); // Fade out label after delay
    });

    // Initialize slider label
    zoomSlider.dispatchEvent(new Event("input"));

    // FAB functionality (Controls the slider menu)
    mapFab.addEventListener("click", () => {
        console.log("FAB clicked - Toggling sidebar");

        // Toggle slider visibility
        isSliderOpen = !isSliderOpen;
        sidebar.classList.toggle("open", isSliderOpen);
        
        // Animate FAB movement into the sidebar
        if (isSliderOpen) {
            mapFab.classList.add("fab-in-slider");
            mapFab.innerHTML = `<span class="material-symbols-outlined">close</span>`;
        } else {
            mapFab.classList.remove("fab-in-slider");
            mapFab.innerHTML = `<span class="material-symbols-outlined">menu_open</span>`;
        }
    });

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









