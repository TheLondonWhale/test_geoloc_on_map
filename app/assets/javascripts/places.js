// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// pour le bouton de test //
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude);
}
//

// map de la view show 
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);

    var mapOptions = {
    center: myCoords,
    zoom: 14
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
    position: myCoords,
    map: map
});
}



function initMap2() {
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;

    // if not defined create default position

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      if (!lat || !lng){
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        document.getElementById('place_latitude').value = lat;
        document.getElementById('place_longitude').value = lng;
      }
      if (!lat || !lng){
          lat=51.5;
          lng=-0.125;
          document.getElementById('place_latitude').value = lat;
          document.getElementById('place_longitude').value = lng;
      }
    }

    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };

    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);

    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });

    function refreshMarker(){
        var lat = document.getElementById('place_latitude').value;
        var lng = document.getElementById('place_longitude').value;
        var myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());
    }
    // when input values change call refreshMarker
    document.getElementById('place_latitude').onchange = refreshMarker;
    document.getElementById('place_longitude').onchange = refreshMarker;

    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
        document.getElementById('place_latitude').value = newlat;
        document.getElementById('place_longitude').value = newlng;
    });

    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());
    });
}

// refresh marker position and recenter map on marker
