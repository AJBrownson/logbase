require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB!");
  } catch (err) {
    console.log("Error in connecting to MongoDB!", err.message);
  }
};

module.exports = {
  connectDB,
};
