const fs = require("fs"); //built-in package
const nodemailer = require("nodemailer");
const hogan = require("hogan.js");

const templatePath = `${__dirname}/template.hjs`; // template string
const template = fs.readFileSync(templatePath, "utf-8");
const compiledTemplate = hogan.compile(template)

module.exports.sendResetPasswordEmail = (email, password) => {
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
    to: email,
    subject: "Mail reset password",
    html: compiledTemplate.render({
      email,
      password
    })
  }

  transporter.sendMail(mailOptions, err => {
    if (err) return console.log(err)
    console.log("success")
  })
}