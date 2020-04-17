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

app.use(express.json());

// app.use("/api", stationRouter);
// app.use("/api", require("./routes/trip"));
// app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/api"))

const port = 5000; ``
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})