const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/Devicecontrollers");

router.post("/devices", deviceController.createDevice);
router.get("/devices", deviceController.getDevices);
router.get("/devices/:deviceId", deviceController.getDeviceById);
router.put("/devices/:deviceId", deviceController.updateDeviceById);
router.delete("/devices/:deviceId", deviceController.deleteDeviceById);

module.exports = router;

// code sets up the following routes for device management:

// POST /devices: To create a new device.
// GET /devices: To retrieve all devices.
// GET /devices: To retrieve a device by its ID.
// PUT /devices: To update a device by its ID.
// DELETE /devices: To delete a device by its ID.
