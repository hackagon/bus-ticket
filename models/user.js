const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, default: "client" }
})


// pre save
// arrow function ko co "this"
// regular function co "this"
UserSchema.pre("save", function (next) {
  const user = this;
  // ko co thay doi password
  if (!user.isModified("password")) return next();

  // Co su thay doi password
  // logic hash password de o day
  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt)
    })
    .then(hash => {
      user.password = hash;
      next()
    })
})

const User = mongoose.model("User", UserSchema, "User")

module.exports = {
  User, UserSchema
}