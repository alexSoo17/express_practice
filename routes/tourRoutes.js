const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursByMonth,
} = require("../controller/tourController");

router.route("/monthly-plan/:year").get(getToursByMonth);
router.route("/").get(getAllTours);
router.route("/:id").get(getTour);

router.route("/").post(createTour);
router.route("/:id").post(updateTour);
router.route("/:id").delete(deleteTour);

module.exports = router;
