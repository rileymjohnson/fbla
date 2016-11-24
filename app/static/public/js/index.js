$(document).ready(function() {
    //initialize slideshow
    $('#camera').camera({
        autoAdvance: true,
        height: '36.48%',
        minHeight: '300px',
        pagination: true,
        thumbnails: false,
        playPause: false,
        hover: false,
        loader: 'none',
        navigation: false,
        navigationHover: false,
        mobileNavHover: false,
        fx: 'simpleFade'
    })    
    
    //initialize mapbox map
    var StartingLocation = [-95.3609405, 29.7065219];
    mapboxgl.accessToken = 'pk.eyJ1IjoicmlsZXltam9obnNvbiIsImEiOiJjaXY1bGptMzAwMWhtMnluNnd2bzk1cjBzIn0.FicxbRtge8W-_mxFb_Qk1A';
    var map = new mapboxgl.Map({
        container: 'google-map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: StartingLocation,
        zoom: 15
    });
    
    //popup for showing more information
    var popup = new mapboxgl.Popup({closeOnClick: false, offset: [0, -64]})
        .setLngLat(StartingLocation)
        .setHTML('<a href="/directions" target="_blank" style="color: #0000EE; text-decoration: underline">3738 Parkwood Dr, Houston, Texas 77021, United States</a>')
    
    // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(/static/public/images/marker.png)';
        el.style.width = '42px';
        el.style.height = '64px';
    
    
        //events for handling mouse hover
        el.addEventListener("mouseover", function() {
            el.style.backgroundImage = 'url(/static/public/images/marker_active.png)';
        })
        
        el.addEventListener("mouseout", function() {
            el.style.backgroundImage = 'url(/static/public/images/marker.png)';
        })
        
        el.addEventListener('click', function() {
            popup.addTo(map)
        });

        // add marker to map
        new mapboxgl.Marker(el, {offset: [-21, -64]}) //this offset centers the image properly
            .setLngLat(StartingLocation)
            .addTo(map);

    //initialize countdown
    var countdownDate = new Date(2016, 12 - 1, 25);
    $('#defaultCountdown').countdown({
        until: countdownDate,
        format: 'DHMS'
    });
    $('#year').text(countdownDate.getFullYear());
});