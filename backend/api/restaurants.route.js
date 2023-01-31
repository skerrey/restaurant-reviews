import express from "express";

const router = express.Router(); // Router for routes

router.route("/").get((req, res) => res.send("Hello World!"));

export default router;