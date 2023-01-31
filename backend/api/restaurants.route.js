import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";

const router = express.Router(); // Router for routes

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

export default router;