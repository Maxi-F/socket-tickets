// Establish connection with server
var socket = io();

let label = $('#lblNuevoTicket');

socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("disconnect", function() {
    console.log("disconnected from server");
});

socket.on("actualState", function(data) {
    label.text(data.actual);
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket)
    });
});