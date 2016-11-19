/* Mailform
=============================================*/
;(function ($) {
	var o = $('.rd-mailform');
	if (o.length > 0) {
		$(document).ready(function () {
			var o = $('.rd-mailform');

			if (o.length) {
				o.rdMailForm({
					validator: {
						'constraints': {
							'@LettersOnly': {
								message: 'Please use letters only!'
							},
							'@NumbersOnly': {
								message: 'Please use numbers only!'
							},
							'@NotEmpty': {
								message: 'Field should not be empty!'
							},
							'@Email': {
								message: 'Enter valid e-mail address!'
							},
							'@Phone': {
								message: 'Enter valid phone number!'
							},
							'@Date': {
								message: 'Use MM/DD/YYYY format!'
							},
							'@SelectRequired': {
								message: 'Please choose an option!'
							}
						}
					}
				}, {
					'MF000': 'Sent',
					'MF001': 'Recipients are not set!',
					'MF002': 'Form will not work locally!',
					'MF003': 'Please, define email field in your form!',
					'MF004': 'Please, define type of your form!',
					'MF254': 'Something went wrong with PHPMailer!',
					'MF255': 'There was an error submitting the form!'
				});
			}
		});
	}
})(jQuery);

$(document).ready(function() {
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
        .setHTML('<a href="/directions" target="_blank" style="color: black">Directions</a>')
    
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
})