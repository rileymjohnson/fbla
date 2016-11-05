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

    //initialize google maps
    $('#google-map').googleMap();

    //initialize countdown
    var countdownDate = new Date(2016, 12 - 1, 25);
    $('#defaultCountdown').countdown({
        until: countdownDate,
        format: 'DHMS'
    });
    $('#year').text(countdownDate.getFullYear());
});