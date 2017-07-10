var StartingLocation = [-101.795467, 35.221816];
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
    directions.setDestination("799 N Grand St, Amarillo, Texas 79107, United States")
})

map.addControl(directions);