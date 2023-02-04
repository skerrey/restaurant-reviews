// Description: Helper file for Axios

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/restaurants", // Change this to your backend URL
  headers: {
    "Content-type": "application/json"
  }
});