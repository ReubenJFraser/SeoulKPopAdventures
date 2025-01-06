// footer.js: Handles dynamic rendering of the footer

document.addEventListener("DOMContentLoaded", () => {
    const mapFooter = document.getElementById("mapFooter");
    const regularFooter = document.getElementById("regularFooter");

    /**
     * Toggles between map mode footer and regular footer.
     * @param {boolean} isMapMode - True for map mode, false for regular mode.
     */
    function toggleFooter(isMapMode) {
        if (isMapMode) {
            mapFooter.style.display = "flex";
            regularFooter.style.display = "none";

            // Dynamically load map mode-specific functionality
            import("./footer-map_mode.js")
                .then((module) => {
                    module.initializeMapMode();
                })
                .catch((err) => console.error("Error loading map mode script:", err));
        } else {
            mapFooter.style.display = "none";
            regularFooter.style.display = "flex";
        }
    }

    // Example toggle functionality
    const modeToggleButton = document.getElementById("toggleModeButton");
    let isMapMode = false;

    if (modeToggleButton) {
        modeToggleButton.addEventListener("click", () => {
            isMapMode = !isMapMode;
            toggleFooter(isMapMode);
        });
    }

    toggleFooter(isMapMode); // Initial setup
});

export { toggleFooter };

