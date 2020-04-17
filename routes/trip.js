const { Trip } = require("../models/trip");
const { Seat } = require("../models/seat");

const seatCodes = [
  "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A12", "A12",
  "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B12", "B12",
]

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    .select("-seats")
    .populate("fromStationId", "name province")
    .populate("toStationId", "name province")
    .then(trips => {
      res.status(200).json(trips);
    })
    .catch(err => res.status(500).json(err))
}

module.exports.getTripById = (req, res, next) => {
  const { id } = req.params;
  Trip
    .findById(id)
    .populate("fromStationId", "name province")
    .populate("toStationId", "name province")
    .then(trip => {
      if (!trip) return Promise.reject({ message: "Trip not found" })

      return res.status(200).json(trip)
    })
    .catch(err => res.status(500).json(err))
}

module.exports.createTrip = (req, res, next) => {
  const { fromStationId, toStationId, price, startTime } = req.body;

  const seats = []
  seatCodes.forEach(code => {
    const newSeat = new Seat({ code })
    seats.push(newSeat)
  })
  // const seat1 = new Seat({ code: "A01" })
  // const seat2 = new Seat({ code: "A02" })
  // const seats = [seat1, seat2]

  const newTrip = new Trip({
    fromStationId, toStationId, price, startTime, seats
  })

  newTrip.save()
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports.updateTripById = (req, res, next) => {
  const { id } = req.params;
  const { fromStationId, toStationId, price, startTime } = req.body;
  Trip.findById(id)
    .then(trip => {
      // if (!trip) return Promise.reject({ message: "Trip not found" })

      trip.fromStationId = fromStationId;
      trip.toStationId = toStationId;
      trip.price = price;
      trip.startTime = startTime;

      return trip.save()
    })
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports._updateTripById = (req, res, next) => {
  const { id } = req.params;
  const { fromStationId, toStationId, price, startTime } = req.body;
  Trip.findById(id)
    .then(trip => {
      if (!trip) return Promise.reject({ message: "Trip not found" })

      if (fromStationId) trip.fromStationId = fromStationId
      if (toStationId) trip.toStationId = toStationId;
      if (price) trip.price = price;
      if (startTime) trip.startTime = startTime;

      return trip.save()
    })
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}


module.exports.deleteTripById = (req, res, next) => {
  const { id } = req.params;
  Trip.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "Delete successfully" })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}