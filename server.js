const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const AppError = require("./src/utils/appError");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB ulandi!"))
  .catch((err) => console.log("MongoDB xatosi:", err));

const app = express();

// ✅ Middleware'lar AVVAL
// Helmet'ni hozircha to'liq bloklamasligi uchun biroz yumshatamiz yoki o'chirib turamiz
app.use(
  helmet({
    contentSecurityPolicy: false, // Tashqi rasmlar va so'rovlar muammosiz ishlashi uchun
  }),
);

app.use(
  cors({
    origin: [
      "https://davo-admin-flame.vercel.app", // Oxiridagi / mutloq olib tashlandi!
      "https://davo-app.vercel.app", // Oxiridagi / mutloq olib tashlandi!
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));

// ✅ Routelar KEYIN
app.use("/api/v1/medicines", require("./src/routes/medicineRoutes"));
app.use("/api/v1/pharmacies", require("./src/routes/pharmacyRoutes"));

app.all("*splat", (req, res, next) => {
  next(new AppError(`Topilmadi: ${req.originalUrl}`, 404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Davo App API server running on port ${PORT}...`);
});
