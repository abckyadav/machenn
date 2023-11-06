const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.getAllUsers);
router.get("/:userId", adminController.getUsersById);
router.patch("/:userId", adminController.updateUser);
router.delete("/:userId", adminController.deleteUser);
router.patch("/reset-password/:userId", adminController.resetPassword);

module.exports = router;
