const mongoose = require("mongoose")
//mongodb+srv://isaac:<password>@cluster0.hjhia.mongodb.net/?retryWrites=true&w=majority
const dbUser = process.env.USER
const dbPassword = process.env.PASSWORD

const conn = async()=>{
  try {
    const dbConn = await 
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.hjhia.mongodb.net/?retryWrites=true&w=majority`)
     console.log("conectado ao banco");
     return dbConn
  } catch (error) {
    console.log(error);
  }
}
conn()


module.exports = conn