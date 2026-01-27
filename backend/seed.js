const mongoose = require("mongoose");
const Measurement = require("./models/Measurement");

mongoose.connect("mongodb://127.0.0.1:27017/analytics");

const data = [
  {
    timestamp: new Date("2025-01-01T10:00:00"),
    field1: 22.5,
    field2: 60,
    field3: 400
  },
  {
    timestamp: new Date("2025-01-01T11:00:00"),
    field1: 23.1,
    field2: 58,
    field3: 420
  },
  {
    timestamp: new Date("2025-01-01T12:00:00"),
    field1: 21.9,
    field2: 65,
    field3: 390
  },
  {
    timestamp: new Date("2025-01-01T13:00:00"),
    field1: 24.0,
    field2: 55,
    field3: 450
  }
];

async function seed() {
  try {
    await Measurement.deleteMany({});
    await Measurement.insertMany(data);
    console.log("Test data inserted");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
