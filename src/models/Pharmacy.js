const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Dorixona nomi shart"], trim: true },
    address: { type: String, required: [true, "Dorixona manzili shart"] },
    phone: { type: String, required: [true, "Telefon raqam shart"] },
    workingHours: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5.0 },
    medicinesCount: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
