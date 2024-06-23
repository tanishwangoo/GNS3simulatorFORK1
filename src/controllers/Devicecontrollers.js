/*This code defines a set of CRUD (Create, Read, Update, Delete) operations 
for managing  "Device" objects.

Framework/tool we used:
Express.js for routing 
Mongoose for MongoDB interactions.                                                  */

const Device = require("../models/Device");

const createDevice = async (req, res) => {
  try {
    const { name, type, x, y } = req.body;
    //ye condition isliye included because many times values of x and y passed were
    //NaN so error aarha tha, hence we confirm here before saving device data
    if (typeof x !== "number" || typeof y !== "number") {
      return res.status(400).json({ message: "Invalid position data" });
    }

    const device = new Device({ name, type, x, y });
    const savedDevice = await device.save();
    res.status(201).json(savedDevice); //agar device successfully created
  } catch (error) {
    res.status(400).json({ message: error.message }); //error message
  }
};
// GET requests for retrieving devices from a MongoDB database using Mongoose
//getdevices() returns a list of all devices
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//getdevicebyid() returns a single device jiski matching id ho
const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//updating an existing device with its id
//for PUT requests
//
const updateDeviceById = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.deviceId, // The ID of the device to update
      req.body, // The new data for the device
      { new: true }
    );
    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDeviceById = async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.deviceId);
    if (!deletedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDevice,
  getDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
};

//all functions tested with api calls except DELETE function
