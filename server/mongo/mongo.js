const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const db = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDb;