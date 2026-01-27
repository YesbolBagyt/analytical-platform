const express = require("express");
const mongoose = require("mongoose");
const measurementRoutes = require("./routes/measurements");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/measurements", measurementRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/analytics")
  .then(() => console.log("MongoDB connected (local)"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Server + Local MongoDB are working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
