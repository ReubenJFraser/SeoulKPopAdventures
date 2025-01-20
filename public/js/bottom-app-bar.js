// Updated JavaScript for the Bottom App Bar with Material Design slider and tick marks

console.log("bottom-app-bar.js initialized");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");

    const globalAppBar = document.getElementById("globalBottomAppBar");
    const mapAppBar = document.getElementById("mapBottomAppBar");

    console.log("App bar elements located:", { globalAppBar, mapAppBar });

    if (!globalAppBar || !mapAppBar) {
        console.error("Error: Required app bar elements are missing");
        return;
    }

    const zoomSlider = document.getElementById("zoomSlider");
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

    const zoomLevels = ["City", "District", "3D", "Street View"];

    if (zoomSlider) {
        zoomSlider.addEventListener("input", (e) => {
            const value = parseInt(e.target.value, 10);
            const index = Math.floor((value - 10) / 3); // Calculate based on 4 stops (10, 13, 16, 20)
            sliderLabel.textContent = zoomLevels[index];

            console.log(`Zoom Level: ${zoomLevels[index]} (${value})`);
        });

        zoomSlider.addEventListener("change", (e) => {
            console.log(`Zoom Level finalized: ${e.target.value}`);
        });

        // Initialize slider label to default value
        zoomSlider.dispatchEvent(new Event("input"));
    } else {
        console.warn("Zoom slider element not found.");
    }

    // FAB functionality
    const mapFab = document.getElementById("mapFab");
    if (mapFab) {
        mapFab.addEventListener("click", () => {
            console.log("FAB clicked");
        });
    } else {
        console.warn("FAB element not found.");
    }

    // Toggle between global and map app bar
    let isMapMode = true; // Default to map mode

    function toggleAppBar(isMapMode) {
        console.log(`Toggling app bar to ${isMapMode ? "map mode" : "global mode"}`);
        globalAppBar.style.display = isMapMode ? "none" : "flex";
        mapAppBar.style.display = isMapMode ? "flex" : "none";
        console.log(`App bar state updated: Global=${globalAppBar.style.display}, Map=${mapAppBar.style.display}`);
    }

    toggleAppBar(isMapMode);
});





