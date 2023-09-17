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
  if (window.marker) {
    window.marker.setMap(null);
  }

  // Create a marker and set its position on the map.
  window.marker = new google.maps.Marker({
    position: markerPosition,
    map: window.mapRef, // Associate the marker with the map
    title: 'Marker Title', // Optional: Add a title to the marker
  });
}

const markers = {
  Other: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  Berlin: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'New Delhi': 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  A: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  B: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
};

function addMarkers(markerPositions) {
  if (!window.mapRef) return;

  // Delete the previous marker if it exists
  if (window.markers) {
    window.markers.map((marker) => marker.setMap(null));
  }

  window.markers = markerPositions.map(
    ({ location, city }) =>
      new google.maps.Marker({
        position: location,
        map: window.mapRef, // Associate the marker with the map
        title: 'Marker Title', // Optional: Add a title to the marker
        icon: {
          url: markers[city], // URL to a red marker icon image
          scaledSize: new google.maps.Size(30, 30), // Size of the icon
          origin: new google.maps.Point(0, 0), // Origin point of the icon (usually 0,0)
          anchor: new google.maps.Point(15, 30), // Anchor point of the icon (centered at the bottom)
        },
      })
  );
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

  axios
    .post('http://localhost:5000/api/v1/nomads', { locations, nomId }) // Replace "/submit" with your server endpoint
    .then(function (response) {
      addMarkers(response.data);
    })
    .catch(function (error) {
      // Handle any errors
      console.error('Error:', error);
      // You can show an error message to the user
    });
};

document
  .querySelector('#map-form')
  .addEventListener('submit', (e) => e.preventDefault());

checkInputs.forEach((input) => {
  input.addEventListener('change', debounce(onChange, 1000));
});
textInput.addEventListener('keyup', debounce(onChange, 1000));

debounce(onChange, 1000)();
