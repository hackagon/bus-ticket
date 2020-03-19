const fs = require("fs"); //built-in package
const nodemailer = require("nodemailer");
const hogan = require("hogan.js");

const templatePath = `${__dirname}/template.hjs`; // template string
const template = fs.readFileSync(templatePath, "utf-8");
const compiledTemplate = hogan.compile(template)

module.exports.sendBookTicketEmail = (email, trip, ticket) => {
  const transport = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'toiladevcybersoft@gmail.com',
      pass: 'SuperDev123'
    }
  }

  const transporter = nodemailer.createTransport(transport)
  // const amount = ticket.seats.length
  const mailOptions = {
    from: "toiladevcybersoft@gmail.com",
    to: "phonghiavan@gmail.com",
    subject: "Mail xác nhận mua vé thành công",
    html: compiledTemplate.render({
      email, // email: email
      // fromStation: Ben xe mien Tay (TP.HCM)
      fromStation: `${trip.fromStationId.name} (${trip.fromStationId.province})`,
      toStation: `${trip.toStationId.name} (${trip.toStationId.province})`,
      startTime: trip.startTime,
      price: trip.price,
      amount: ticket.seats.length,
      // ticket.seats: [{code: "A01", isBooked: true}, {code: "A02", isBooked: true}]
      // map ==> ["A01", "A02"]
      // join ==> "A01, A02"
      seatCodes: ticket.seats.map(s => s.code).join(", "),
      total: ticket.seats.length * trip.price
    })
  }

  transporter.sendMail(mailOptions, err => {
    if (err) return console.log(err)
    console.log("success")
  })
}