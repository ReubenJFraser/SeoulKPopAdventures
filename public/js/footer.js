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
        } else {
            mapFooter.style.display = "none";
            regularFooter.style.display = "flex";
        }
    }

    // Example: Listen for a mode toggle button to switch between footers
    const modeToggleButton = document.getElementById("toggleModeButton");
    let isMapMode = false; // Default to regular mode

    if (modeToggleButton) {
        modeToggleButton.addEventListener("click", () => {
            isMapMode = !isMapMode;
            toggleFooter(isMapMode);
        });
    }

    // Initial setup: Default to regular mode
    toggleFooter(isMapMode);
});

export { toggleFooter };
