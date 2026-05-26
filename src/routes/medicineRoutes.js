const express = require("express");
const medicineController = require("../controllers/medicineController");

const router = express.Router();

// ✅ Mavjud routerlar qatoriga mana buni qo'shing (boshqa routerlardan TEPADA tursin)
router.get("/dashboard/stats", medicineController.getDashboardStats);
// Barcha dorilar uchun yo'nalishlar
router
  .route("/")
  .get(medicineController.getAllMedicines)
  .post(medicineController.createMedicine);

// ID bo'yicha bitta dori uchun yo'nalishlar
router
  .route("/:id")
  .get(medicineController.getMedicine)
  .patch(medicineController.updateMedicine)
  .delete(medicineController.deleteMedicine);

module.exports = router;
