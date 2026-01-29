const mongoose = require("mongoose");
const Measurement = require("./models/Measurement");

mongoose.connect("mongodb://127.0.0.1:27017/analytics");

const data = [];
const startDate = new Date("2025-01-01");

for (let i = 0; i < 20; i++) {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i);

  data.push({
    timestamp: date,
    field1: 20 + Math.random() * 5,   // temperature
    field2: 50 + Math.random() * 15,  // humidity
    field3: 380 + Math.random() * 100 // CO2
  });
}

async function seed() {
  try {
    await Measurement.deleteMany({});
    await Measurement.insertMany(data);
    console.log("Daily test data inserted");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
