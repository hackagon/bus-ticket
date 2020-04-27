const express = require("express");
const mongoose = require("mongoose"); // ORM
const stationRouter = require("./routes/station");

mongoose.connect("mongodb+srv://admin:admin@cluster0-h96u9.mongodb.net/bus-ticket?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connect to DB successfully"))
  .catch(err => console.log(err))

// connect DB
// Tao Schema
// Tao Model
// ======= API =======
// Tao instance
// Luu instance ==> DB (document)


const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

app.use(express.json());

// app.use("/api", stationRouter);
// app.use("/api", require("./routes/trip"));
// app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/api"))

const port = process.env.PORT || 5000; ``
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})