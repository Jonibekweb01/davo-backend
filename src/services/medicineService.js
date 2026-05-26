const Medicine = require("../models/Medicine");
const AppError = require("../utils/appError");

class MedicineService {
  async getAllMedicines(filters) {
    const query = {};

    // 1. Qidiruv logikasi (Qidiruv maydoni uchun)
    if (filters.search) {
      query.name = { $regex: filters.search, $options: "i" };
    }

    // 2. Kategoriya bo'yicha filter
    if (filters.category && filters.category !== "Hammasi") {
      query.category = filters.category;
    }

    // Dorixona ma'lumotlari bilan birga yuklash (Optimallashgan select bilan)
    return await Medicine.find(query).populate({
      path: "pharmacy",
      select: "name address location workingHours",
    });
  }

  async getMedicineById(id) {
    const medicine = await Medicine.findById(id).populate("pharmacy");
    if (!medicine) {
      throw new AppError("Dori topilmadi", 404);
    }
    return medicine;
  }
}

module.exports = new MedicineService();
