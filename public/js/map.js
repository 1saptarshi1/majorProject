const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});


const marker = new mapboxgl.Marker({ color: 'red' }) // Create a new marker with a custom color
    .setLngLat(listing.geometry.coordinates) // Marker position [lng, lat]
    .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
        `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
    ))
    .addTo(map); // Add the marker to the map