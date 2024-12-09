// centralized_state.js: Centralizes state variables to be used across modules

// Initialize a history stack to track visited map locations
export let historyStack = [];

// Initialize the current index to track the current position in the history stack
export let currentIndex = -1;

// Log to confirm that centralized state has loaded and initialized
console.log("Centralized state loaded:", { currentIndex, historyStack });

// Function to update the current index and history stack
export function updateHistory(location) {
    if (currentIndex === historyStack.length - 1 || currentIndex === -1) {
        historyStack.push(location);
        currentIndex++;
    } else {
        historyStack = historyStack.slice(0, currentIndex + 1);
        historyStack.push(location);
        currentIndex++;
    }
}

// Function to update navigation buttons based on history stack
export function updateNavigationButtons() {
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');

    if (backButton && forwardButton) {
        backButton.disabled = currentIndex <= 0;
        forwardButton.disabled = currentIndex >= historyStack.length - 1;
    } else {
        console.warn('Navigation buttons not found.');
    }
}

