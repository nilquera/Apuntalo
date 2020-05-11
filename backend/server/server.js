require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { call_blockchain } = require("../../blockchain/web3-3");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", require("./routes/index"));

// Habilitar la carpeta public
app.use(
  express.static(path.resolve(__dirname, "../../frontend/dist/angularweb"))
);

// inicialitzar call_blockchain

blockchain = new call_blockchain();
blockchain.init_web3();
console.log("blockchain inicialitzada");

mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("[ OK ] connected to database");
    app.listen(process.env.PORT);
  })
  .then(() => {
    console.log("[ OK ] listening on port", process.env.PORT);
  })
  .catch((err) => {
    throw err;
  });

module.exports.blockchain = blockchain;
