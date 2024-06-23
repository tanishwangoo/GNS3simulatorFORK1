// Express.js server with a MongoDB connection

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const deviceRoutes = require("./routes/Deviceroutes");

const app = express();
app.use(express.json());
app.use(cors()); //dealing with cors

mongoose.connect("mongodb://localhost:27017/iot-security-lab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", deviceRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
