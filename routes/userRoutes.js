const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  checkId,
  checkRequest,
  createUser
} = require("../controller/userController");

router.param("id", checkId);
router.route("/").get(getAllUsers);
router.route("/").post(checkRequest,createUser)
router.route("/:id").get(getUserById);

module.exports = router;
