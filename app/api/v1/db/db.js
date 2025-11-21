const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_NAME = process.env.DATABASE_NAME
const DB_URL = process.env.DB_URL

const connectToMongoose = async () => {
  try {
    // Establish connection to MongoDB using environment variable for URI
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DATABASE_NAME
    });
    console.log("Connected to Database:", DATABASE_NAME);
  } catch (error) {
    console.error("Error connecting to Database:", DATABASE_NAME, error);
    throw error;
  }
};

module.exports = connectToMongoose;