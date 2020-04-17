
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const { User } = require("../models/user");
const { sendResetPasswordEmail } = require("../sendEmail/sendResetPasswordEmail/index")


// middleware
// function(req, res , next){}
// middleware phai tra ve RES or NEXT
// RES ==> ket thuc
// NEXT ==> chuyen sang middleware tiep theo
module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports.createUser = (req, res, next) => {
  const { email, password, fullName, phone } = req.body

  let newUser;
  newUser = new User({ email, password, fullName, phone })
  return newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))


  // .then(salt => {
  //   return bcrypt.hash(password, salt)
  // })
  // .then(hash => {
  //   newUser.password = hash;
  //   return newUser.save()
  // })
}

module.exports.updateUserById = (req, res, next) => {
  const { userId } = req.params
  const { fullName, phone } = req.body;
  User.findById(userId)
    .then(user => {
      user.fullName = fullName;
      user.phone = phone;

      return user.save()
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err))
}

module.exports.updatePassword = (req, res, next) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  User.findById(userId)
    .then(user => {
      user.password = newPassword;
      return user.save()
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
}

// API: reset password (forget password)

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "Delete successfully" })
    })
    .catch(err => {
      res.status(500).json(err);
    })
}
// Delete user

// login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // email phonghiavan@gmail.com
  // find, findOne, findById
  let user;
  User.findOne({ email: email })
    .then(_user => {
      user = _user;
      if (!user) return Promise.reject({ message: "Email not exist" })

      // user {email: phonghiavan@gmail.com, password: sjdknfdkjsnfjksdnfjndsjknfjsd}
      return bcrypt.compare(password, user.password)
    })
    .then(isMatched => {
      if (!isMatched) return Promise.reject({ message: "Wrong password" })

      const payload = {
        userId: user._id,
        email,
        fullName: user.fullName,
        userType: user.userType
      }

      jwt.sign(
        payload,
        "abc123",
        { expiresIn: 3600 },
        (err, token) => {
          res.status(200).json({
            message: "Login successfully",
            token
          })
        }
      )
    })
    .catch(err => {
      res.status(500).json(err);
    })
}

// change password !== reset password
// Chang pw: van nho pw cu, nhung muon doi pw moi
// chang pw: input vao phai co (pw + email)
// reset pw: chua dang nhap ==> forget pw ==> input: email
// POST method
module.exports.resetPassword = (req, res, next) => {
  const { email } = req.body;
  const newPassword = Math.random().toString(36).substring(3)

  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ message: "Email not exist" })

      user.password = newPassword;
      return user.save();
    })
    .then(user => {
      sendResetPasswordEmail(email, newPassword);

      res.status(200).json({
        message: `Reset password successfully, new password is sent to your email: ${email}`
      })
    })
}