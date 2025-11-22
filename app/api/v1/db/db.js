const mongoose = require('mongoose');
// require('dotenv').config();

const DATABASE_NAME = process.env.DATABASE_NAME

const connectToMongoose = async () => {
  try {
    // Establish connection to MongoDB using environment variable for URI
    await mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to Database:", err));
    console.log("Connected to Database:", DATABASE_NAME);
  } catch (error) {
    console.error("Error connecting to Database:", DATABASE_NAME, error);
    throw error;
  }
};

module.exports = connectToMongoose;