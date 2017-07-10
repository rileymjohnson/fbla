function formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

$(window).load(function () {

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next'
            , center: 'title'
            , right: 'month,agendaWeek,agendaDay'
        }
        , selectable: false
        , selectHelper: false
        , eventClick: function (event) {
            $("#name").text(event.name)
            $("#deleteEvent").data("event", event.id)
            $("#reservationDate").text(moment(event.start).format('MMMM d, YYYY'))
            $("#reservationPeople").text(event.people)
            $("#reservationPackage").text(event.package)
            $("#reservationPhone").text(formatPhoneNumber(event.phone))
            $("#reservationEmail").text(event.email)
            $("#reservationDetails").text(event.details)

            $("#reservationModal").modal("show")
            calendar.fullCalendar('unselect');
        }
        , eventRender: function (event, element) {
            element.text(event.name)
        }
        , editable: false
        , events: reservations
    });

});

$("#deleteEvent").click(function (e) {
    $.post("/admin/api/deletereservation", {
        id: $(e.target).data("event")
    }, function (data) {
        if (data == "true") {
            new PNotify({
                title: 'Success'
                , text: 'The reservation was deleted successfully!'
                , type: 'success'
                , styling: 'bootstrap3'
            });
            $('#calendar').fullCalendar('removeEvents', function (event) {
                return event._id == $(e.target).data("event")
            });
        } else {
            new PNotify({
                title: 'Failure'
                , text: 'The reservation was not updated.'
                , type: 'error'
                , styling: 'bootstrap3'
            });
        }
    })
})