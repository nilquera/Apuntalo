const express = require("express");
const app = express();
const { verifyToken } = require("../middlewares/authentication");
const Post = require("../models/post");
let ObjectId = require("mongoose").Types.ObjectId;

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

//Compra post (postid)
app.get("/bc/purchase", verifyToken, (req, res) => {
  let { blockchain } = require("../server");
  let { postid } = req.body;
  let uid = req.user._id;
  let uaddress = req.user.blockchain_address;

  if (!ObjectId.isValid(postid)) {
    return res.status(400).json({
      ok: false,
      message: "postid must be a valid id",
    });
  }

  Post.findById(postid, "creator price", async (err, postDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!postDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `Post with id ${postid} not found`,
        },
      });
    }

    if (uid === postDB.creator) {
      return res.status(400).json({
        ok: false,
        message: "Buyer and Seller can't be the same user",
      });
    }

    try {
      User.findById(
        creator,
        "blockchain_address",
        (err, blockchain_address) => blockchain_address
      ).then(async (saddress) => {
        console.log(saddress);
        let ubalance = await blockchain.get_Balance(uaddress);
        // Comprovar balance > price
        if (ubalance < postDB.price) {
          return res.status(400).json({
            ok: false,
            message: "Buyer doesn't have enough money",
          });
        }

        let transaction = await send_coin(uaddress, saddress, postDB.price);
        console.log(transaction);
        return;
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        e,
      });
    }
    // finally {
    //   console.log(postDB);
    //   return res.json({
    //     ok: true,
    //     post: postDB,
    //   });
    // }
  });

  //sender (blockchain address), receiver, amount, post a comprar
});

// Ingressa pasta a l'usuari que demana (token)
app.get("/bc/ingresar", verifyToken, async (req, res) => {
  let { blockchain } = require("../server");
  let { amount } = req.body;

  if (isNaN(amount) || amount < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Amount is not a valid number",
      },
    });
  }

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
    let ret = await blockchain.ingresar(uaddress, amount);
    console.log(ret);
    return res.json({
      ok: true,
      ingreso: amount,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      e,
    });
  }

  //account, amount
});

module.exports = app;
