var x = document.getElementById('demo');

function getLocation() {
  if (navigator.geolocation) {
    showPosition({
      coords: {
        latitude: 31.516637,
        longitude: 74.3041847,
      },
    });

    // if (navigator.geolocation.coords) showPosition(navigator.geolocation);
    // else navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

function showPosition(position) {
  x.innerHTML =
    'Latitude: ' +
    position.coords.latitude +
    '<br>Longitude: ' +
    position.coords.longitude;

  if (!window.mapRef) return;

  const mapCoords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  flyTo(mapCoords, 16);

  addMarker(mapCoords);
}

$('#myForm').submit(function (e) {
  e.preventDefault();
  console.log('CLicked Testing', window.currentPosition);
});

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
