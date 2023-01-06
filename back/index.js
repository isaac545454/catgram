require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const app = express();
const router = require("./routes/router");
//config JSON and form data
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//acesso do front
app.use(cors({ credentials: true, origin: "http://locahost:3000" }));

//caminho das imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB conexão
require("./config/db");

app.use(router);

app.listen(port, () => {
  console.log("rodando");
});
