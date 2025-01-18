// footer-map_mode.js: Handles map mode-specific functionality

document.addEventListener("DOMContentLoaded", () => {
    const sliderHandle = document.getElementById('slider-handle');
    const sliderLine = document.querySelector('line');
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const mapFab = document.getElementById('mapFab'); // FAB reference

    const sliderRect = sliderLine.getBoundingClientRect();
    const minX = 20; // Slider's minimum x-coordinate
    const maxX = 180; // Slider's maximum x-coordinate

    let zoomLevel = 1; // Initial zoom level

    // Drag functionality for the slider handle
    sliderHandle.addEventListener('mousedown', () => {
        const onMouseMove = (e) => {
            let newX = e.clientX - sliderRect.left;
            if (newX < minX) newX = minX;
            if (newX > maxX) newX = maxX;

            sliderHandle.setAttribute('cx', newX);

            // Map the newX position to zoom level
            zoomLevel = 1 + ((newX - minX) / (maxX - minX)) * 9; // Zoom range 1x to 10x
            console.log(`Zoom Level: ${zoomLevel.toFixed(1)}x`);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    // Menu button functionality
    menuButton.addEventListener('click', () => {
        const isVisible = menuDropdown.style.display === 'block';
        menuDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Zoom out button functionality
    zoomOutButton.addEventListener('click', () => {
        let currentX = parseFloat(sliderHandle.getAttribute('cx'));
        if (currentX > minX) {
            currentX -= 10; // Move handle left
            if (currentX < minX) currentX = minX;

            sliderHandle.setAttribute('cx', currentX);

            // Map the newX position to zoom level
            zoomLevel = 1 + ((currentX - minX) / (maxX - minX)) * 9;
            console.log(`Zoom Level: ${zoomLevel.toFixed(1)}x`);
        } else {
            console.log('Already at minimum zoom level.');
        }
    });

    // FAB functionality
    if (mapFab) {
        mapFab.addEventListener('click', () => {
            console.log("FAB clicked");
            // Open navigation menu or perform an action
        });
    } else {
        console.warn("FAB element not found.");
    }
});

export function initializeMapMode() {
    console.log("Map mode footer initialized.");
}

