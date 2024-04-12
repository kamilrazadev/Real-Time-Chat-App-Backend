const mongoose = require("mongoose");

exports.connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`error connecting mongoDB: ${error.message}`);
  }
};
