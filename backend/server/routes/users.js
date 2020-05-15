const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const User = require("../models/user");
const { verifyToken, verifyAdmin } = require("../middlewares/authentication");
const app = express();

// Returns DB users with state: true [needs valid token]
app.get("/users", verifyToken, (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);
  if (isNaN(from)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "<from> has to be a number",
      },
    });
  }
  let limit = req.query.limit || 5;
  limit = Number(limit);
  if (isNaN(limit)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "<limit> has to be a number",
      },
    });
  }

  User.find({ state: true }, "username email name role state google img posts")
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      User.count({ state: true }, (err, count) => {
        res.json({
          ok: true,
          count,
          users,
        });
      });
    });
});

// Returns User by ID
app.get("/users/:id", verifyToken, (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .populate("posts", "meta state _id title date")
    .exec((err, userDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: `User with id ${id} not found`,
          },
        });
      }

      res.json({
        ok: true,
        userDB,
      });
    });
});

app.post("/users", (req, res) => {
  let { blockchain } = require("../server");
  let body = req.body;

  let user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    name: body.name,
    university: body.university,
    degree: body.degree,
    img: body.img,
    blockchain_address: "aslfjddsalf",
  });

  user.save(async (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    console.log("Demanant adressa...");
    //let address = blockchain.signup_user();
    let address = await blockchain.signup_user();
    console.log(address);

    let body = {
      blockchain_address: address,
    };

    User.findByIdAndUpdate(userDB._id, body, { new: true }, (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        user: userDB,
      });
    });
  });
});

// Modify user by id [needs valid token with admin privilege]
app.put("/users/:id", [verifyToken, verifyAdmin], (req, res) => {
  let id = req.params.id;
  // deletes password field or any other --> avoids password update
  let body = _.pick(req.body, [
    "username",
    "email",
    "role",
    "state",
    "name",
    "university",
    "degree",
    "img",
  ]);

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!userDB) {
        return res.status(404).json({
          ok: false,
          err: {
            message: `User with id ${id} not found`,
          },
        });
      }

      res.json({
        ok: true,
        user: userDB,
      });
    }
  );
});

// Delete user by id [needs valid token with admin privilege]
app.delete("/users/:id", [verifyToken, verifyAdmin], (req, res) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        err: {
          message: `User with id ${id} not found`,
        },
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });
  });

  // User.findByIdAndRemove(id, (err, userBorrado) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     })
  //   }
  //
  //   if (!userBorrado){
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: "User not found"
  //       }
  //     })
  //   }
  //
  //   res.json({
  //     ok: true,
  //     user: userBorrado
  //   })
  // })
});

module.exports = app;
