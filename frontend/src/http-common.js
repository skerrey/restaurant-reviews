// Description: Helper file for Axios

import axios from "axios";

export default axios.create({
  baseURL: "https://restaurant-reviews-backend-h23u.onrender.com/api/v1/restaurants", // Change this to your backend URL
  headers: {
    "Content-type": "application/json"
  }
});