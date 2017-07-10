$(".messageButton").click(function (e) {
    e.preventDefault()
    var id = $(this).data("id");
    $("#messageDate").text(messages[id].date + " @ " + messages[id].time)
    $("#messageText").text(messages[id].message)
    $("#deleteButton").data("id", id)
    $("#messageEmail").html(" From: <a href='mailto:" + messages[id].email + "'>" + messages[id].email + "</a><br /><small>Phone number: " + messages[id].phone + "</small>")
})

$("#deleteButton").click(function (e) {
    var oldId = $(this).data("id");

    //removes item from list
    $("#" + oldId).remove()

    //if this is last message in list
    if ($("#messageList").children().length <= 0) {
        $.post("/admin/api/deletemessage", {
            id: oldId
        }, function (data) {
            if (data == "true") {
                $("#messageNum").text($("#messageList").children().length)
                $("#messageNumm").removeClass("label-success")
                $("#messageNum").addClass("label-info")
                $("#messageContainer").html("<h4>There are no messages at this time. Please try again later.</h4>")
                new PNotify({
                    title: 'Success'
                    , text: 'The message was deleted successfully!'
                    , type: 'success'
                    , styling: 'bootstrap3'
                });
            } else {
                new PNotify({
                    title: 'Failure'
                    , text: 'The message was not deleted.'
                    , type: 'error'
                    , styling: 'bootstrap3'
                });
            }
        })
    } else {
        $.post("/admin/api/deletemessage", {
            id: oldId
        }, function (data) {
            if (data == "true") {
                $("#messageNum").text($("#messageList").children().length)
                    //sets content of new message
                var id = $("#messageList").children().first().attr("id");
                $("#messageDate").text(messages[id].date + " @ " + messages[id].time)
                $("#messageText").text(messages[id].message)
                $("#deleteButton").data("id", id)
                $("#messageEmail").html(" From: <a href='mailto:" + messages[id].email + "'>" + messages[id].email + "</a><br /><small>Phone number: " + messages[id].phone + "</small>")
                new PNotify({
                    title: 'Success'
                    , text: 'The message was deleted successfully!'
                    , type: 'success'
                    , styling: 'bootstrap3'
                });
            } else {
                new PNotify({
                    title: 'Failure'
                    , text: 'The message was not deleted.'
                    , type: 'error'
                    , styling: 'bootstrap3'
                });
            }
        })
    }
})