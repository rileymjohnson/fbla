function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

$("#form").submit(function(e) {
	e.preventDefault()
	$(".error-text").hide()       
    var formIsValid = true

    var name = $("#name").val()
    var email = $("#email").val()
    var phone = $("#phone").val()
    var message = $("#message").val()

    if (!name) {
    	$("#nameError").show()
    	formIsValid = false
    }

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
    	$("#emailError").show()
    	formIsValid = false
    }

    if (!message) {
    	$("#messageError").show()
    	formIsValid = false
    }

    if (phone && !phone.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)) {
        $("#phoneError").show()
        formIsValid = false
    }

    if (!phone) {
        phone = "No phone number"
    } else {
        phone = formatPhoneNumber(phone)
    }

    if (formIsValid) {
    	$.post("/api/contact", {
    		name: name,
    		email: email,
    		phone: phone,
    		message: message
    	}, function(e) {
    		if (e== "true") {
                $("#form")[0].reset() //reset form
                successModal.open()
            } else {
                $("#form")[0].reset() //reset form
                failureModal.open()
             }
    	})
    }
})

var successModal = $('#successModal').remodal();
var failureModal = $("#failureModal").remodal();