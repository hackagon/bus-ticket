const express = require("express");

const { authenticate, authorize } = require("../middlewares/auth")
const { getUsers, createUser, updateUserById,
  updatePassword, deleteUserById, login } = require("./user");

const { getStations, getStationById, createStation,
  updateStationById, deleteStationById } = require("./station");

const { getTrips, getTripById, createTrip,
  updateTripById, deleteTripById, _updateTripById } = require("./trip");

const {
  validateCreateUser,
  validateUpdateUser, validateUpdatePassword } = require("../middlewares/validations/validate.user")
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
router.post("/stations", authenticate, authorize(["admin"]), createStation)
router.put("/stations/:stationId", authenticate, authorize(["admin"]), updateStationById)
router.delete("/stations/:stationId", authenticate, authorize(["admin"]), deleteStationById)

// TRIP
router.get("/trips", getTrips)
router.get("/trips/:id", getTripById)
router.post("/trips", authenticate, authorize(["admin"]), createTrip)
router.put("/trips/:id", authenticate, authorize(["admin"]), updateTripById)
router.delete("/trips/:id", authenticate, authorize(["admin"]), deleteTripById)
router.patch("/trips/:id", authenticate, authorize(["admin"]), _updateTripById)

module.exports = router;