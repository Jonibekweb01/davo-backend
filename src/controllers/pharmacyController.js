const Pharmacy = require("../models/Pharmacy");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPharmacies = catchAsync(async (req, res, next) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json({
    status: "success",
    results: pharmacies.length,
    data: { pharmacies },
  });
});

exports.createPharmacy = catchAsync(async (req, res, next) => {
  const newPharmacy = await Pharmacy.create(req.body);
  res.status(201).json({
    status: "success",
    data: { pharmacy: newPharmacy },
  });
});

exports.updatePharmacy = catchAsync(async (req, res, next) => {
  const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pharmacy) return next(new AppError("Dorixona topilmadi", 404));
  res.status(200).json({
    status: "success",
    data: { pharmacy },
  });
});

exports.deletePharmacy = catchAsync(async (req, res, next) => {
  const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
  if (!pharmacy) return next(new AppError("Dorixona topilmadi", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});