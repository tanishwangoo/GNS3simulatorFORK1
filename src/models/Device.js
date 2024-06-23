const mongoose = require("mongoose");
//defines schema for each device to be stored in the database
const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //uska naam entered when it is created in the frontend
  },
  type: {
    type: String,
    enum: ["router", "switch", "pc", "raspberry-pi"], //uski type attacked with its image
    required: true,
  },
  x: {
    type: Number,
    required: true, //uski x pos on workspace
  },
  y: {
    type: Number, //y pos on workspace
    required: true,
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;

//PENDING TASK
//x and y positions should be made dynamic
//so that when an object is moved on workspace/or displaced
//it's corresponding value updates in the database
