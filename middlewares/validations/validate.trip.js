const validator = require("validator");
const _ = require("lodash");

module.exports.validateCreateTrip = (req, res, next) => {
  let errors = {};
  const fromStationId = _.get(req, "body.fromStationId", "");
  const toStationId = _.get(req, "body.toStationId", "");
  const price = _.get(req, "body.price", "");
  const startTime = _.get(req, "body.startTime", "");

  if (validator.isEmpty(fromStationId)) {
    errors.fromStationId = "From station is required"
  }

  if (validator.isEmpty(toStationId)) {
    errors.toStationId = "To station is required"
  }

  if (!_.isNumber(price)) {
    errors.price = "Price is required"
  } else if (price <= 0) {
    errors.price = "Price must be > 0"
  }

  if (validator.isEmpty(startTime)) {
    errors.startTime = "Start time station is required"
  }

  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors)
  }
}

module.exports.validateUpdateTrip = async (req, res, next) => {
  const { id } = req.params;

  let errors = {};

  const trip = await Trip.findById(id)
  if (!trip) {
    errors.id = "Trip not found"
  }

  const fromStationId = _.get(req, "body.fromStationId", "");
  const toStationId = _.get(req, "body.toStationId", "");
  const price = _.get(req, "body.price", "");
  const startTime = _.get(req, "body.startTime", "");

  if (validator.isEmpty(fromStationId)) {
    errors.fromStationId = "From station is required"
  }

  if (validator.isEmpty(toStationId)) {
    errors.toStationId = "To station is required"
  }

  if (!_.isNumber(price)) {
    errors.price = "Price is required"
  } else if (price <= 0) {
    errors.price = "Price must be > 0"
  }

  if (validator.isEmpty(startTime)) {
    errors.startTime = "Start time station is required"
  }

  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors)
  }
}