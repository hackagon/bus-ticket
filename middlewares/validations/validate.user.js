const validator = require('validator');
const _ = require('lodash')
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

module.exports.validateCreateUser = async (req, res, next) => {

  let errors = {};
  let isValid;

  let { email, password, fullName, phone } = req.body;

  // email
  // 1.Frontend co gui field email
  // 2.email = undefined, ""
  // 3.email nay da ton trong he thong
  // 4.email nay ko hop le ("abc" thay vi "abc@gmail.com")
  if (!email) email = "";
  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else {
    const user = await User.findOne({ email })
    if (user) {
      errors.email = "Email exist"
    } else if (!validator.isEmail(email)) {
      errors.email = "Email is invalid"
    }
  }

  // password
  if (!password) password = "";
  if (validator.isEmpty(password)) {
    errors.password = "Password is required"
  } else if (!validator.isLength(password, { min: 10 })) {
    errors.password = "Password must have at least 10 characters"
  }

  // fullName
  if (!fullName) fullName = "";
  if (validator.isEmpty(fullName)) {
    errors.fullName = "Full name is required"
  }

  // phone
  if (!phone) phone = "";
  if (validator.isEmpty(phone)) {
    errors.phone = "Phone is required"
  }

  if (_.isEmpty(errors)) {
    isValid = true
  } else {
    isValid = false
  }

  // 400: bad request
  if (isValid) {
    next();
  } else {
    res.status(400).json(errors);
  }

  // errors = object
  // TH1: Nguoi dung nhap dung het errors = {} => isValid = true
  // TH2: Nguoi dung nhap sai it nhat 1 field: errors = {email: "Email exist"} ==> isValid = false
  // isValid: true | false
  // true  next()
  // false res()
}


module.exports.validateUpdateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { fullName, phone } = req.body;

  let errors = {};

  // validate id
  if (validator.isEmpty(userId)) {
    errors.id = "id is required"
  } else {
    const user = await User.findById(userId);
    if (!user) errors.id = "User not found"
  }

  // validate fullName
  if (!fullName) fullName = ""
  if (validator.isEmpty(fullName)) {
    errors.fullName = "Full name is required"
  }

  // validate phone
  if (!phone) phone = ""
  if (validator.isEmpty(phone)) {
    errors.phone = "Phone is required"
  }

  //  _.isEmpty check empty cho object/array {}, [] (true)
  // validator.isEmpty check string, number  (0, "", undefined, null (false))

  // _.isEmpty(errors) ==> true
  // errors = {}
  // nguoi dung nhap dung het
  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors);
  }
}


module.exports.validateUpdatePassword = async (req, res, next) => {
  const { userId } = req.params;
  const { password, newPassword } = req.body;

  let errors = {};

  let user;
  if (validator.isEmpty(userId)) {
    errors.id = "Id is required"
  } else {
    user = await User.findById(userId);
    if (!user) errors.id = "User not found"
  }

  if (!password) password = "";
  if (validator.isEmpty(password)) {
    errors.password = "Old password is required"
  } else {
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      errors.password = "Password not match"
    }
  }

  if (!newPassword) newPassword = "";
  if (validator.isEmpty(newPassword)) {
    errors.newPassword = "New password is required";
  } else if (!validator.isLength(newPassword, { min: 10 })) {
    errors.newPassword = "Password must have at least 10 characters"
  }

  if (_.isEmpty(errors)) {
    next()
  } else {
    res.status(400).json(errors)
  }
}