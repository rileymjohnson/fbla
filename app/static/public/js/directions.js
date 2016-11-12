var StartingLocation = [-95.3609405, 29.7065219];
mapboxgl.accessToken = 'pk.eyJ1IjoicmlsZXltam9obnNvbiIsImEiOiJjaXY1bGptMzAwMWhtMnluNnd2bzk1cjBzIn0.FicxbRtge8W-_mxFb_Qk1A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9', //this could be "light" or "dark"
    zoom: 13
});

//create mapbox direction service
var directions = new mapboxgl.Directions({
    proximity: StartingLocation, //make results closer to starting location
    interactive: false
})

//set destination on map load
map.on("load", function() {
    directions.setDestination("3738 Parkwood Dr Houston, TX 77021-1510")
})

map.addControl(directions);