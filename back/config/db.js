const mongoose = require("mongoose");
const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.p2x8fjn.mongodb.net/?retryWrites=true&w=majority`
    );
    //

    return dbConn;
  } catch (error) {
    //
  }
};

conn();

module.exports = conn;
// mongodb+srv://isaac:<password>@cluster0.p2x8fjn.mongodb.net/?retryWrites=true&w=majority
