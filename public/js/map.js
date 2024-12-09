// map.js: Handles map-specific logic
import { openBulmaModal } from './modal-navigation.js';
import { updateHistory, historyStack, currentIndex } from './centralized_state.js';

mapboxgl.accessToken = 'pk.eyJ1IjoicmV1YmVuZnJhc2VyIiwiYSI6ImNseXhzaDFtMTIxNGwyanB5ZnMxM3NrZXUifQ.DbnJosot3YViMDioceWHYg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [126.9780, 37.5665],  // Coordinates for the center of Seoul
  zoom: 12,                     
  pitch: 45,                    
  bearing: 0                    
});

map.on('load', () => {
  // Adding 3D buildings layer
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16.05,
        ['get', 'height']
      ],
      'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16.05,
        ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
    }
  });

  // Fetching and adding markers to the map
  fetch('http://localhost/bulma-test/dist/api.php') // Updated path to match BULMA-TEST structure
    .then(response => response.json())
    .then(locations => {
      console.log('Fetched locations:', locations);  
      locations.forEach((location, index) => {
        const latitude = parseFloat(location.Latitude);
        const longitude = parseFloat(location.Longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
          console.error(`Invalid coordinates for location ${index}: (${latitude}, ${longitude})`);
          return;
        }

        const coordinates = [longitude, latitude];

        // Create a marker and add it to the map
        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(map);

        // Adding click listener to the marker for Bulma modal creation and zoom functionality
        marker.getElement().addEventListener('click', () => {
          console.log(`Marker at coordinates ${coordinates} clicked.`);
          
          // Debugging: Log the current state before flying to the marker
          console.log('Before flyTo:');
          console.log('Current Map Center:', map.getCenter());
          console.log('Current Zoom Level:', map.getZoom());

          // Check if the coordinates are valid
          if (coordinates && coordinates.length === 2) {
            console.log('Valid coordinates for flyTo:', coordinates);

            // Zoom into the marker's location and center the map
            map.flyTo({
              center: coordinates,  // Coordinates of the clicked marker
              zoom: 15,             // Zoom level
              speed: 1.5,           // Smooth transition speed
              curve: 1              // Smooth curve when flying to the marker
            });

            // Debugging: Log the new state after flyTo
            map.on('moveend', () => {
              console.log('After flyTo:');
              console.log('New Map Center:', map.getCenter());
              console.log('New Zoom Level:', map.getZoom());
            });

            // Call the function to open the modal with the location details
            openBulmaModal(location);
            updateHistory(location); // Update the centralized history state
          } else {
            console.log('Invalid coordinates, skipping flyTo.');
          }
        });
      });
    })
    .catch(error => console.error('Error fetching location data:', error));
});









