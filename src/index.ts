// Import Material Web utilities
import '@material/web/ripple/ripple.js';
import '@material/web/elevation/elevation.js';
import '@material/web/focus/md-focus-ring.js';

// Import specific Material Web components
import '@material/web/slider/slider.js'; // Slider
import '@material/web/button/filled-button.js'; // Filled button
import '@material/web/button/outlined-button.js'; // Outlined button (future use)
import '@material/web/button/tonal-button.js'; // Tonal button (future use)
import '@material/web/fab/fab.js'; // Floating Action Button (FAB)
import '@material/web/checkbox/checkbox.js'; // Checkbox
import '@material/web/iconbutton/icon-button.js'; // Icon button
import '@material/web/menu/menu.js'; // Menu
import '@material/web/switch/switch.js'; // Switch
import '@material/web/typography/typography.js'; // Typography (base styles)

// Create and add a slider
const slider = document.createElement('md-slider');
slider.setAttribute('min', '0');
slider.setAttribute('max', '100');
slider.setAttribute('value', '50');
document.body.appendChild(slider);

// Create and add a filled button
const button = document.createElement('md-filled-button');
button.textContent = 'Click Me!';
document.body.appendChild(button);

// Create and add a floating action button (FAB)
const fab = document.createElement('md-fab');
fab.setAttribute('icon', 'add');
document.body.appendChild(fab);

// Create and add an outlined button (for future use)
const outlinedButton = document.createElement('md-outlined-button');
outlinedButton.textContent = 'Outlined Button';
document.body.appendChild(outlinedButton);

// Create and add a checkbox
const checkbox = document.createElement('md-checkbox');
checkbox.setAttribute('aria-label', 'Example checkbox');
document.body.appendChild(checkbox);

// Create and add an icon button
const iconButton = document.createElement('md-icon-button');
iconButton.setAttribute('icon', 'favorite');
document.body.appendChild(iconButton);

// Create and add a switch
const switchElement = document.createElement('md-switch');
switchElement.setAttribute('aria-label', 'Example switch');
document.body.appendChild(switchElement);

// Create and add a menu (for future use)
const menu = document.createElement('md-menu');
document.body.appendChild(menu);

// Log a message indicating all components are added
console.log("Material Web components have been added, including utilities and future-use elements.");


  
