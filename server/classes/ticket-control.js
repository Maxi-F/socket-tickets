const fs = require("fs");

class Ticket {

    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }


}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCounting();
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        file.saveFile(this.last, this.today, this.tickets, this.lastFour);
        return this.getLastTicket();
    }

    getLastTicket() {
        return `Ticket: ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    callTicket(deskNumber) {
        console.log(this.tickets.length);
        if (!this.tickets.length) {
            return 'No tickets left';
        } // verify if there are any tickets to attend

        let ticketNumber = this.tickets[0].number; // to manage the problems that could arise we do this assignment, as all objects are passed as reference
        this.tickets.shift(); // eliminate next ticket to attend. (first one on the queue)

        let attendingTicket = new Ticket(ticketNumber, deskNumber);
        this.lastFour.unshift(attendingTicket); // create and add new attending tickets

        if (this.lastFour.length > 4) {
            this.lastFour.pop(); // delete last one
        }

        file.saveFile(this.last, this.today, this.tickets, this.lastFour);

        return this.lastFour;
    }

    restartCounting() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        file.saveFile(this.last, this.today, this.tickets, this.lastFour);
        console.log("System initialized.");
    }
}

const file = {
    saveFile: function(last, todayDate, tickets, lastFour) {
        let jsonData = {
            last,
            today: todayDate,
            tickets,
            lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketControl
}