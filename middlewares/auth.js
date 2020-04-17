const jwt = require("jsonwebtoken");

// auth: authentication | authorization
module.exports.authenticate = (req, res, next) => {
  // authentication
  // lay token tu HEADER
  // neu header ko co token ==> res: thieu token
  // neu co token ==> verify token ==> true ==> next
  //                               ==> false ==> token invalid
  const token = req.header("token");
  // 401: ko co xac thuc
  // 403: forbidden 
  // 404: not found
  if (!token) return res.status(401).json({ message: "You must provide token" })

  jwt.verify(token, "abc123", (err, decoded) => {
    if (decoded) {
      req.user = decoded // decoded la payload cua token, chua thong email, userType, fullName
      next()
    } else {
      res.status(401).json({ message: "Token invalid" })
    }
  })
}

// userType: admin | client
// authorize([ "admin"])
// authorize(["client"]) book ticket
// authorize([ "admin", "client"])
module.exports.authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { userType } = req.user;
    if (userTypeArray.indexOf(userType) > -1) {
      next()
    } else {
      res.status(403).json({ message: "You are not allowed to access" })
    }
  }
}