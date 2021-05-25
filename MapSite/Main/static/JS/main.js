let map;

let locations = [
    { lat: 50.45, lng: 30.52 },
    { lat: 50.45, lng: 30.32 },
    { lat: 50.45, lng: 30.14 },
    { lat: 50.45, lng: 30.12 },
    { lat: 50.45, lng: 30.45 },
    { lat: 50.45, lng: 30.42 },
    { lat: 50.45, lng: 30.60 },
    { lat: 50.4803852, lng: 30.5953703 }
];

let markers = []

let massage = ['ss', 'dd']

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 50.45, lng: 30.52 },
        mapTypeControl: false,
        fullscreenControl: false
    });
    locations.forEach(element => {
        addMarker(element)
    });
}

function addMarker(locations) {
    const marker = new google.maps.Marker({
        position: locations,
        map: map,
    })
    markers.push(marker)
}