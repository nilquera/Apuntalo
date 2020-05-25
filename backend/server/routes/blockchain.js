const express = require("express");
const app = express();
const { verifyToken } = require("../middlewares/authentication");
const Post = require("../models/post");
const User = require("../models/user");
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
app.post("/bc/purchase", verifyToken, (req, res) => {
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

  Post.findById(postid, "creator price editors", (err, postDB) => {
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

    User.findById(
      postDB.creator,
      "blockchain_address",
      async (err, creatorDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        if (!creatorDB) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        let ubalance = await blockchain.get_Balance(uaddress);
        // Comprovar balance > price
        if (ubalance < postDB.price) {
          return res.status(400).json({
            ok: false,
            message: "Buyer doesn't have enough money",
          });
        }

        let body = {
          editors: postDB.editors,
        };
        if (body.editors.indexOf(uid) !== -1) body.editors.push(uid);
        else {
          return res.status(400).json({
            ok: false,
            err: {
              message: `Buyer is already an editor`,
            },
          });
        }

        let transaction = await blockchain
          .send_coin(uaddress, creatorDB.blockchain_address, postDB.price)
          .catch((err) => {
            return res.status(400).json({
              ok: false,
              err: {
                message: `Internal error when making the transaction`,
              },
            });
          });

        Post.findByIdAndUpdate(
          postid,
          body,
          { new: true, runValidators: true, context: "query" },
          (err, postDB) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err,
              });
            }

            res.json({
              ok: true,
              post: postDB,
            });
          }
        );
      }
    );
  });

  //sender (blockchain address), receiver, amount, post a comprar
});

// Ingressa pasta a l'usuari que demana (token)
app.post("/bc/ingresar", verifyToken, async (req, res) => {
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
