// Description: This file is the initial starting point for the Node/Express server.

import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express(); // Initialize express

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable express to parse JSON

app.use("/api/v1/restaurants", restaurants);
app.use(
  cors({
    origin: ["http://localhost:5000",
    "https://restaurant-reviews-backend-h23u.onrender.com/" ],
  })
);


app.use("*", (req, res) => res.status(404).json({ error: "Page not found" })); // Wildcard 404 route

export default app;