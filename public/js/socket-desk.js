var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('desk is required');
};

var desk = searchParams.get('escritorio');
var label = $('small');
console.log(desk);

$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(res) {
        if (res === 'No tickets left') {
            alert(res);
            return;
        }
        label.text(res[0].number);
    })
})