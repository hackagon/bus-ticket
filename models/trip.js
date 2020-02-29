const mongoose = require("mongoose");
const { SeatSchema } = require("./seat");

const TripSchema = new mongoose.Schema({
  fromStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station"
  },
  toStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station"
  },
  startTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seats: [SeatSchema]
})

const Trip = mongoose.model("Trip", TripSchema, "Trip");
// model: Trip.find(), .findById(), deleteOne, updateOne,
// instance: const newTrip = new Trip() ==> trip.save(), trip,remove(),....
// document

module.exports = {
  TripSchema, Trip
}