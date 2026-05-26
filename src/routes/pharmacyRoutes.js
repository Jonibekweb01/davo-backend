const express = require("express");
const router = express.Router();
const {
  getAllPharmacies,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
} = require("../controllers/pharmacyController");

router.route("/").get(getAllPharmacies).post(createPharmacy);
router.route("/:id").patch(updatePharmacy).delete(deletePharmacy);

module.exports = router;