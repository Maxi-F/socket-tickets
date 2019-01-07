const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket()
        console.log(next);
        callback(next);
    })

    // emit an event called "actualState"
    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'desk is required.'
            });
        }
        let attendTicket = ticketControl.callTicket(data.desk);
        callback(attendTicket);
        client.broadcast.emit('nextAttendingTicket', ticketControl.getLastFour());
    });
});