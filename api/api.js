import axios from "axios";

const API_URL = "http://localhost:5000/api/devices"; //backend ki url

//axios is a module jo hamari help krta hai to send request to the API to do some action.
export const fetchDevices = async () => {
  const response = await axios.get(API_URL); //Sends a GET request to the API to retrieve all devices
  return response.data;
};

export const addDevice = async (device) => {
  const response = await axios.post(API_URL, device); //Sends a POST request to the API to add a new device
  return response.data;
};

export const updateDevicePosition = async (id, position) => {
  const response = await axios.put(`${API_URL}/${id}/position`, position); //Sends a PUT request to the API to update the position of a specific device
  return response.data;
};
