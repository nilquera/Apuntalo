const express = require("express");
const app = express();
const { verifyToken } = require("../middlewares/authentication");

// Retorna el balance de l'usuari que demana (token)
app.get("/bc/balance", verifyToken, async (req, res) => {
  let { blockchain } = require("../server");
  let uaddress = req.user.blockchain_address;
  if (uaddress == "default" || !uaddress) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "User doesn't have a valid blockchain address",
      },
    });
  }

  try {
    let ubalance = await blockchain.get_Balance(uaddress);
    return res.json({
      ok: true,
      balance: ubalance,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      e,
    });
  }
});

app.get("/bc/sendCoin", verifyToken, (req, res) => {
  //sender (blockchain address), receiver, amount, post a comprar
});

// Ingressa pasta a l'usuari que demana (token)
app.get("/bc/ingresar", verifyToken, (req, res) => {
  //account, amount
});

module.exports = app;
