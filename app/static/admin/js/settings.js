function formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}


$("#passwordButton").click(function () {
    if (!$("#password").val()) {
        new PNotify({
            title: 'Failure'
            , text: 'That is not a valid password.'
            , type: 'error'
            , styling: 'bootstrap3'
        });
        return;
    }

    $.post("/admin/api/updatepassword", {
        password: $("#password").val()
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The password was updated successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The password was not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})

$("#peopleButton").click(function () {
    if (!$("#people").val()) {
        new PNotify({
            title: 'Failure'
            , text: 'That is not a valid number.'
            , type: 'error'
            , styling: 'bootstrap3'
        });
        return;
    }

    $.post("/admin/api/updatepeople", {
        people: $("#people").val()
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The maximum guests booked was updated successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The maximum guests booked was not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})

$("#phoneButton").click(function () {
    if (!$("#phone").val().match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)) {
        new PNotify({
            title: 'Failure'
            , text: 'That is not a valid phone number.'
            , type: 'error'
            , styling: 'bootstrap3'
        });
        return;
    }

    $.post("/admin/api/updatephone", {
        phone: formatPhoneNumber($("#phone").val())
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The phone number was updated successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The phone number was not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})

$("#emailButton").click(function () {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test($("#email").val())) {
        new PNotify({
            title: 'Failure'
            , text: 'That is not a valid email.'
            , type: 'error'
            , styling: 'bootstrap3'
        });
        return;
    }

    $.post("/admin/api/updateemail", {
        email: $("#email").val()
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The email was updated successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The email was not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})