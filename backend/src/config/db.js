const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anu250867anu:anu250867anu@cluster0.gw9uk5w.mongodb.net/user"
    );
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
