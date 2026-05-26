const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Dori nomi shart"], trim: true },
    price: { type: Number, required: [true, "Dori narxi shart"], min: 0 },
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Kardiologiya", "Tabletka", "Krem", "Vitamin", "Jihozlar"], // Kategoriyalar validatsiyasi
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Medicine", medicineSchema);
