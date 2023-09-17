function initMap() {
  // Create a map object and specify the DOM element for display.
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 52.520008, lng: 13.404954 }, // Change this to your desired initial location
    zoom: 12, // Adjust the zoom level as needed
  });

  window.mapRef = map;
}

function flyTo(position, zoom) {
  if (!window.mapRef) return;

  window.currentPosition = position;

  window.mapRef.panTo(position);

  if (zoom) window.mapRef.setZoom(16);
}

function addMarker(markerPosition) {
  if (!window.mapRef) return;

  // Delete the previous marker if it exists
  if (marker) {
    marker.setMap(null);
  }

  // Create a marker and set its position on the map.
  marker = new google.maps.Marker({
    position: markerPosition,
    map: window.mapRef, // Associate the marker with the map
    title: 'Marker Title', // Optional: Add a title to the marker
  });
}

const checkInputs = document.querySelectorAll('.form-check-input');
const textInput = document.querySelector('.form-text-input');

const onChange = () => {
  const locations = [];

  const form_data = new FormData(document.querySelector('#map-form'));

  for (var pair of form_data.entries()) {
    if (pair[0] === 'locations') locations.push(pair[1]);
  }

  const nomId = textInput.value;
  console.log('🚀 ~ file: map.js:42 ~ onChange ~ locations:', locations);
  console.log('🚀 ~ file: map.js:50 ~ onChange ~ nomId:', nomId);
};

document.querySelector('#map-form').addEventListener('submit', e => e.preventDefault());

checkInputs.forEach(input => {
  input.addEventListener('change', debounce(onChange, 1000));
});
textInput.addEventListener('keyup', debounce(onChange, 1000));

debounce(onChange, 1000)();
