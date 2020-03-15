const validator = require("validator");
const _ = require("lodash");

module.exports.validateCreateStation = (req, res, next) => {
  let errors = {};
  // let { name, address, province } = req.body;

  // let { name } = req.body;
  // if(!name) name = ""
  const name = _.get(req, "body.name", "");
  const address = _.get(req, "body.address", "");
  const province = _.get(req, "body.province", "");

  if (validator.isEmpty(name)) {
    errors.name = "Name is requried"
  }

  if (validator.isEmpty(address)) {
    errors.address = "Address is requried"
  }

  if (validator.isEmpty(province)) {
    errors.province = "Province is requried"
  }

  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors);
  }
}

module.exports.validateUpdateStation = (req, res, next) => {
  let errors = {};
  // let { name, address, province } = req.body;

  // let { name } = req.body;
  // if(!name) name = ""
  const name = _.get(req, "body.name", "");
  const address = _.get(req, "body.address", "");
  const province = _.get(req, "body.province", "");

  if (validator.isEmpty(name)) {
    errors.name = "Name is requried"
  }

  if (validator.isEmpty(address)) {
    errors.address = "Address is requried"
  }

  if (validator.isEmpty(province)) {
    errors.province = "Province is requried"
  }

  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors);
  }
}