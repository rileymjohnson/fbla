scriptString = ""
function include(scriptUrl) {
	document.write('<script src="' + scriptUrl + '"></script>');
    scriptString += '<script src="' + scriptUrl + '"></script>'
}

function isIE() {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* cookie.JS
 ========================================================*/
include('/static/public/js/jquery.cookie.js');

/* Easing library
 ========================================================*/
include('/static/public/js/jquery.easing.1.3.js');

/* PointerEvents
 ========================================================*/
;
(function ($) {
	if(isIE() && isIE() < 11){
		include('/static/public/js/pointer-events.js');
		$('html').addClass('lt-ie11');
		$(document).ready(function(){
			PointerEventsPolyfill.initialize({});
		});
	}
})(jQuery);

/* Stick up menus
 ========================================================*/
;
(function ($) {
	var o = $('html');
	if (o.hasClass('desktop')) {
		include('/static/public/js/tmstickup.js');

		$(document).ready(function () {
			$('#stuck_container').TMStickUp({})
		});
	}
})(jQuery);

/* ToTop
 ========================================================*/
;
(function ($) {
	var o = $('html');
	if (o.hasClass('desktop')) {
		include('/static/public/js/jquery.ui.totop.js');

		$(document).ready(function () {
			$().UItoTop({
				easingType: 'easeOutQuart',
				containerClass: 'toTop fa-arrow-up'
			});
		});
	}
})(jQuery);

/* EqualHeights
 ========================================================*/
;
(function ($) {
	var o = $('[data-equal-group]');
	if (o.length > 0) {
		include('/static/public/js/jquery.equalheights.js');
	}
})(jQuery); 

/* Copyright Year
 ========================================================*/
;
(function ($) {
	var currentYear = (new Date).getFullYear();
	$(document).ready(function () {
		$("#copyright-year").text((new Date).getFullYear());
	});
})(jQuery);


/* Superfish menus
 ========================================================*/
;
(function ($) {
	include('/static/public/js/superfish.js');
})(jQuery);

/* Navbar
 ========================================================*/
;
(function ($) {
	include('/static/public/js/jquery.rd-navbar.js');
})(jQuery);


/* Google Map
 ========================================================*/
;
(function ($) {
	var o = document.getElementById("google-map");
	if (o) {
		include('//maps.google.com/maps/api/js?key=AIzaSyAqrT5A7y9IajXTIqdr3UZltNKcs4-3PTA');
		include('/static/public/js/jquery.rd-google-map.js');

		$(document).ready(function () {
			var o = $('#google-map');
			if (o.length > 0) {
				o.googleMap();
			}
		});
	}
})
(jQuery);

/* WOW
 ========================================================*/
;
(function ($) {
	var o = $('html');

	if ((navigator.userAgent.toLowerCase().indexOf('msie') == -1 ) || (isIE() && isIE() > 9)) {
		if (o.hasClass('desktop')) {
			include('/static/public/js/wow.js');

			$(document).ready(function () {
				new WOW().init();
			});
		}
	}
})(jQuery);

/* Orientation tablet fix
 ========================================================*/
$(function () {
	// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
		ua = navigator.userAgent,

		gestureStart = function () {
			viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
		},

		scaleFix = function () {
			if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
				viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
				document.addEventListener("gesturestart", gestureStart, false);
			}
		};

	scaleFix();
	// Menu Android
	if (window.orientation != undefined) {
		var regM = /ipod|ipad|iphone/gi,
			result = ua.match(regM);
		if (!result) {
			$('.sf-menus li').each(function () {
				if ($(">ul", this)[0]) {
					$(">a", this).toggle(
						function () {
							return false;
						},
						function () {
							window.location.href = $(this).attr("href");
						}
					);
				}
			})
		}
	}
});
var ua = navigator.userAgent.toLocaleLowerCase(),
	regV = /ipod|ipad|iphone/gi,
	result = ua.match(regV),
	userScale = "";
if (!result) {
	userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">');

/* Camera
========================================================*/
;(function ($) {
var o = $('#camera');
	if (o.length > 0) {
		if (!(isIE() && (isIE() > 9))) {
			include('/static/public/js/jquery.mobile.customized.min.js');
		}

		include('/static/public/js/camera.js');

		$(document).ready(function () {
			o.camera({
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
		});
	}
})(jQuery);

/* Parallax
 =============================================*/
;(function ($) {
	include('/static/public/js/jquery.rd-parallax.js');
})(jQuery);

/* Mailform
=============================================*/
;(function ($) {
	var o = $('.rd-mailform');
	if (o.length > 0) {
		include('/static/public/js/mailform/jquery.form.min.js'); 
		include('/static/public/js/mailform/jquery.rd-mailform.min.js');

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

/* Countdown
=============================================*/
;(function ($) {
	var o = $('#defaultCountdown');
	if (o.length > 0) {
		include('/static/public/js/jquery.plugin.min.js');
		include('/static/public/js/jquery.countdown.min.js');
		$(document).ready(function () {
			var austDay = new Date();
			austDay = new Date(2016, 12, 25);
			$('#defaultCountdown').countdown({until: austDay, format: 'DHMS'});
			$('#year').text(austDay.getFullYear());
		});
	} 
})(jQuery);