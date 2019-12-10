var map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
function zoomTo() {
      var lat = document.getElementById("lat").value;
      var lng = document.getElementById("lng").value;
      window.location= "https://stark-fjord-57520.herokuapp.com/parken";
      map.panTo(new L.LatLng(lat, lng));
  }
map.on('locationerror', onLocationError);
