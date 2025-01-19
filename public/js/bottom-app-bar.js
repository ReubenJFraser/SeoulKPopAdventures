// bottom-app-bar.js: Handles global and map-specific functionality for the bottom app bar

document.addEventListener("DOMContentLoaded", () => {
    const globalAppBar = document.getElementById("globalBottomAppBar");
    const mapAppBar = document.getElementById("mapBottomAppBar");

    const mapFab = document.getElementById("mapFab");
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");
    const zoomSlider = document.getElementById("zoomSlider");
    const zoomOutButton = document.getElementById("zoomOutButton");
    const sliderHandle = document.getElementById('slider-handle');
    const sliderLine = document.querySelector('line');

    let isMapMode = false; // Default mode
    let zoomLevel = 1; // Initial zoom level

    /**
     * Toggles between global app bar and map-specific app bar.
     * @param {boolean} isMapMode - True for map mode, false for global mode.
     */
    function toggleAppBar(isMapMode) {
        if (isMapMode) {
            globalAppBar.style.display = "none";
            mapAppBar.style.display = "flex";
        } else {
            globalAppBar.style.display = "flex";
            mapAppBar.style.display = "none";
        }
    }

    // Initialize with the current mode
    toggleAppBar(isMapMode);

    // Event listener for mode toggle (optional)
    const modeToggleButton = document.getElementById("toggleModeButton");
    if (modeToggleButton) {
        modeToggleButton.addEventListener("click", () => {
            isMapMode = !isMapMode;
            toggleAppBar(isMapMode);
        });
    }

    // FAB functionality
    if (mapFab) {
        mapFab.addEventListener("click", () => {
            console.log("FAB clicked");
            // Open navigation menu or perform an action
        });
    } else {
        console.warn("FAB element not found.");
    }

    // Menu button functionality
    if (menuButton && menuDropdown) {
        menuButton.addEventListener("click", () => {
            const isVisible = menuDropdown.style.display === "block";
            menuDropdown.style.display = isVisible ? "none" : "block";
        });
    }

    // Zoom slider functionality
    if (zoomSlider) {
        zoomSlider.addEventListener("input", (e) => {
            zoomLevel = e.target.value;
            console.log(`Zoom Level: ${zoomLevel}`);
            // Update map zoom level dynamically
        });
    }

    // Zoom out button functionality
    if (zoomOutButton) {
        zoomOutButton.addEventListener("click", () => {
            zoomLevel = Math.max(zoomLevel - 1, 1); // Ensure zoom level stays above minimum
            console.log(`Zoom Out: New Zoom Level: ${zoomLevel}`);
            // Update map zoom level dynamically
        });
    }

    // Drag functionality for the slider handle
    if (sliderHandle && sliderLine) {
        const sliderRect = sliderLine.getBoundingClientRect();
        const minX = 20; // Slider's minimum x-coordinate
        const maxX = 180; // Slider's maximum x-coordinate

        sliderHandle.addEventListener('mousedown', () => {
            const onMouseMove = (e) => {
                let newX = e.clientX - sliderRect.left;
                newX = Math.max(minX, Math.min(maxX, newX));

                sliderHandle.setAttribute('cx', newX);

                // Map the newX position to zoom level
                zoomLevel = 1 + ((newX - minX) / (maxX - minX)) * 9; // Zoom range 1x to 10x
                console.log(`Drag Zoom Level: ${zoomLevel.toFixed(1)}x`);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });
    }
});

