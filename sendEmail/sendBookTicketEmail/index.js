const nodemailer = require("nodemailer");

module.exports.sendBookTicketEmail = () => {
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

  const mailOptions = {
    from: "toiladevcybersoft@gmail.com",
    to: "phonghiavan@gmail.com",
    subject: "Mail xác nhận mua vé thành công",
    html: "Cảm ơn bạn đã mua vé"
  }

  transporter.sendMail(mailOptions, err => {
    if (err) return console.log(err)
    console.log("success")
  })
}