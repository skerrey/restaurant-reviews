// Description: This file is the initial starting point for the Node/Express server.

import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express(); // Initialize express

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable express to parse JSON

app.use("/api/v1/restaurants", restaurants);


app.use("*", (req, res) => res.status(404).json({ error: "Page not found" })); // Wildcard 404 route

export default app;