const Medicine = require("../models/Medicine");
const catchAsync = require("../utils/catchAsync");

// Barcha dorilarni bazadan olish
exports.getAllMedicines = catchAsync(async (req, res, next) => {
  const medicines = await Medicine.find();
  res.status(200).json({
    status: "success",
    results: medicines.length,
    data: { medicines },
  });
});

// Yangi dori qo'shish
exports.createMedicine = catchAsync(async (req, res, next) => {
  const newMedicine = await Medicine.create(req.body);
  res.status(201).json({
    status: "success",
    data: { medicine: newMedicine },
  });
});

// Bitta dorini ID bo'yicha olish
exports.getMedicine = catchAsync(async (req, res, next) => {
  const medicine = await Medicine.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: { medicine },
  });
});

// Dorini yangilash
exports.updateMedicine = catchAsync(async (req, res, next) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { medicine },
  });
});

// Dorini o'chirish
exports.deleteMedicine = catchAsync(async (req, res, next) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Faylning eng tepasida Pharmacy modeli import qilinganiga ishonch hosil qiling!
// Agar tepada bo'lmasa, mana shu qatorni ham qo'shing:
const Pharmacy = require("../models/Pharmacy");

// ... (eski kodlaringiz turaveradi) ...

// ✅ Dashboard uchun barcha statistikani yig'uvchi yangi funksiya
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Parallel ravishda dori va dorixonalarni sanaymiz
  const [totalMedicines, totalPharmacies] = await Promise.all([
    Medicine.countDocuments(),
    Pharmacy.countDocuments(),
  ]);

  // Recharts grafiklari uchun dorilarni kategoriyalar bo'yicha guruhlaymiz
  const categoryStats = await Medicine.aggregate([
    {
      $group: {
        _id: "$category", // Model ichidagi kategoriya maydoni bo'yicha
        doriSoni: { $sum: 1 },
      },
    },
    {
      $project: {
        name: { $ifNull: ["$_id", "Noma'lum"] }, // Kategoriya bo'sh bo'lsa "Noma'lum" chiqadi
        doriSoni: 1,
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      totalMedicines,
      totalPharmacies,
      totalCategories: categoryStats.length,
      chartData: categoryStats,
    },
  });
});
