var socket = io();

var lblTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblDesks = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

socket.on('actualState', function(data) {
    renderHTML(data.lastFour)
});

socket.on('nextAttendingTicket', function(data) {
    renderHTML(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play()
})

function renderHTML(lastFour) {
    if (!lastFour.length) {
        noTickets(0, lblTickets.length);
    }
    console.log('hello');
    for (var i = 0; i < lblTickets.length; i++) {
        if (lastFour[i]) {
            lblTickets[i].text('Ticket ' + lastFour[i].number);
            lblDesks[i].text('Escritorio ' + lastFour[i].desk);
        } else {
            noTickets(i, lblTickets.length - i);
        }
    }
}

function noTickets(from, to) {
    for (var i = from; i < to; i++) {
        lblTickets[i].text('No hay tickets por atender');
        lblDesks[i].text('');
    }
}