// map.js: Handles map-specific logic
import { openBulmaModal } from './src/assets/js/modal-navigation.js';

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
  fetch('http://localhost/bulma-test/api.php') // Updated path to match BULMA-TEST structure
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

        // Adding click listener to the marker for Bulma modal creation
        marker.getElement().addEventListener('click', () => {
          console.log(`Marker at coordinates ${coordinates} clicked.`);
          // Call a function to open the modal
          openBulmaModal(location);
        });
      });
    })
    .catch(error => console.error('Error fetching location data:', error));
});


