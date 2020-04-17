const express = require("express");

const { authenticate, authorize } = require("../middlewares/auth")
const { getUsers, createUser, updateUserById,
  updatePassword, deleteUserById, login, resetPassword } = require("./user");

const { getStations, getStationById, createStation,
  updateStationById, deleteStationById } = require("./station");

const { getTrips, getTripById, createTrip,
  updateTripById, deleteTripById, _updateTripById } = require("./trip");

const {
  validateCreateUser,
  validateUpdateUser, validateUpdatePassword } = require("../middlewares/validations/validate.user")

const { validateCreateStation, validateUpdateStation } = require("../middlewares/validations/validate.station")
const { validateCreateTrip, validateUpdateTrip } = require("../middlewares/validations/validate.trip")

const { createTicket, getTickets } = require("./ticket");
const router = express.Router();

// USER
router.get("/users", getUsers)
router.post("/users", validateCreateUser, createUser)
router.put(
  "/users/:userId",
  authenticate,
  authorize(["client", "admin"]),
  validateUpdateUser,
  updateUserById
)

router.patch("/users/reset-password", resetPassword)

router.patch(
  "/users/:userId",
  authenticate,
  authorize(["client", "admin"]),
  validateUpdatePassword,
  updatePassword
)
router.delete("/users/:userId", authenticate, authorize(["client", "admin"]), deleteUserById)
router.post("/users/login", login);

// STATION
router.get("/stations", getStations)
router.get("/stations/:stationId", getStationById)
router.post(
  "/stations",
  authenticate,
  authorize(["admin"]),
  validateCreateStation,
  createStation
)
router.put(
  "/stations/:stationId",
  authenticate,
  authorize(["admin"]),
  validateUpdateStation,
  updateStationById
)
router.delete("/stations/:stationId", authenticate, authorize(["admin"]), deleteStationById)

// TRIP
router.get("/trips", getTrips)
router.get("/trips/:id", getTripById)
router.post(
  "/trips",
  authenticate,
  authorize(["admin"]),
  validateCreateTrip,
  createTrip
)
router.put(
  "/trips/:id",
  authenticate,
  authorize(["admin"]),
  validateUpdateTrip,
  updateTripById
)
router.delete("/trips/:id", authenticate, authorize(["admin"]), deleteTripById)
router.patch("/trips/:id", authenticate, authorize(["admin"]), _updateTripById)


// ticket
router.post(
  "/tickets",
  authenticate,
  createTicket
)

router.get(
  "/tickets",
  authenticate,
  authorize(["admin"]),
  getTickets
)

module.exports = router;