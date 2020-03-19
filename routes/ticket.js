const { Ticket } = require("../models/ticket");
const { User } = require("../models/user");
const { Trip } = require("../models/trip");
const { Seat } = require("../models/seat");
const _ = require("lodash");
const { sendBookTicketEmail } = require("../sendEmail/sendBookTicketEmail/index")

// book ticket = createTicket
module.exports.createTicket = (req, res, next) => {
  // authentication
  const { userId, email } = req.user;
  const { tripId, seatCodes } = req.body;

  Trip.findById(tripId)
    .populate("fromStationId")
    .populate("toStationId")
    .then(trip => {
      if (!trip) return Promise.reject({ message: "Trip not found" });
      // trip ton tai
      // lay danh sach ghe available
      // [{code: "A01", isBooked: false}, {code: "A02", isBooked: true}, {code: "A03", isBooked: false}]
      // [{code: "A01", isBooked: false}, {code: "A03", isBooked: false}] (filter)
      // ["A01", "A03"] (map)
      const availableSeatCodes = trip.seats
        .filter(s => {
          return !s.isBooked
        })
        .map(s => {
          return s.code
        })

      let errSeatCodes = [];
      // seatCodes = ["A02", "A03"]
      seatCodes.forEach(s => {
        if (availableSeatCodes.indexOf(s) === -1) errSeatCodes.push(s); // errSeatCodes = ["A02"]
      })

      // ko book dc
      if (!_.isEmpty(errSeatCodes)) {
        return Promise.reject({
          message: "Some seats are not available",
          errSeatCodes
        })
      }

      // book duoc
      // tao ticket + email
      const newTicket = new Ticket({
        tripId,
        userId,
        seats: seatCodes.map(code => new Seat({ code })),
        totalPrice: seatCodes.length * trip.price
      })

      // modify trip
      seatCodes.forEach(code => {
        const index = trip.seats.findIndex(s => s.code === code)
        trip.seats[index].isBooked = true;
      })

      return Promise.all([
        newTicket.save(),
        trip.save()
      ])
    })
    .then(result => {
      const ticket = result[0]
      const trip = result[1];

      sendBookTicketEmail(email, trip, ticket);

      res.status(200).json(ticket)
    })
    .catch(err => res.status(500).json(err))
}