$(".js-switch").change(function (e) {
    if (e.target.checked) {
        $(e.target).next().next().text("Open")
    } else {
        $(e.target).next().next().text("Closed")
    }
})

$("#submit").click(function () {
    var hours = {
        mon: {
            start: String($("#monStart").val())
            , end: String($("#monEnd").val())
            , open: String(+$("#monOpen").prop("checked"))
        }
        , tue: {
            start: String($("#tueStart").val())
            , end: String($("#tueEnd").val())
            , open: String(+$("#tueOpen").prop("checked"))
        }
        , wed: {
            start: String($("#wedStart").val())
            , end: String($("#wedEnd").val())
            , open: String(+$("#wedOpen").prop("checked"))
        }
        , thu: {
            start: String($("#thuStart").val())
            , end: String($("#thuEnd").val())
            , open: String(+$("#thuOpen").prop("checked"))
        }
        , fri: {
            start: String($("#friStart").val())
            , end: String($("#friEnd").val())
            , open: String(+$("#friOpen").prop("checked"))
        }
        , sat: {
            start: String($("#satStart").val())
            , end: String($("#satEnd").val())
            , open: String(+$("#satOpen").prop("checked"))
        }
        , sun: {
            start: String($("#sunStart").val())
            , end: String($("#sunEnd").val())
            , open: String(+$("#sunOpen").prop("checked"))
        }

    }

    $.post("/admin/api/updatehours", {
        hours: JSON.stringify(hours)
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The hours were updated successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
            $("#submit").prop("disabled", true)
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The hours were not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})

$("#formHolder").change(function () { //enables but when there is a change
    $("#submit").prop("disabled", false)
})