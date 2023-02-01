// Description: API Routes for Restaurants

import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router(); // Router for routes

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

router
  .route("review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;