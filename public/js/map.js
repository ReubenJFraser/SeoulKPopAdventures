// map.js
import { openBulmaModal } from './marker-modal.js';
import { updateHistory } from './centralized_state.js';

mapboxgl.accessToken = 'pk.eyJ1IjoicmV1YmVuZnJhc2VyIiwiYSI6ImNseXhzaDFtMTIxNGwyanB5ZnMxM3NrZXUifQ.DbnJosot3YViMDioceWHYg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [126.9780, 37.5665], // Seoul center
  zoom: 12,
  pitch: 45,
  bearing: 0,
});

map.on('load', () => {
  // Add 3D buildings
  map.addLayer({
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16.05,
        ['get', 'height'],
      ],
      'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16.05,
        ['get', 'min_height'],
      ],
      'fill-extrusion-opacity': 0.6,
    },
  });

  // ✔ Fetch marker data from Node/EJS route
  fetch('/seoul-kpop-adventures/api/restaurants')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((locations) => {
      console.log('Fetched locations:', locations);

      locations.forEach((location) => {
        const latitude = parseFloat(location.Latitude);
        const longitude = parseFloat(location.Longitude);
        if (isNaN(latitude) || isNaN(longitude)) {
          console.error(`Invalid coordinates for location: (${latitude}, ${longitude})`);
          return;
        }

        const coordinates = [longitude, latitude];

        // Create and add the marker
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        // Click -> open Bulma modal
        marker.getElement().addEventListener('click', () => {
          map.flyTo({
            center: coordinates,
            zoom: 15,
            speed: 1.5,
            curve: 1,
          });
          openBulmaModal(location);
          updateHistory(location); // if you track marker visits
        });
      });
    })
    .catch((error) => console.error('Error fetching location data:', error));
});













