const express = require("express");
const _ = require("underscore");
let { verifyToken, verifyAdmin } = require("../middlewares/authentication");
let app = express();
let etherpadApi = require("etherpad-lite-client");

let ObjectId = require("mongoose").Types.ObjectId;
let Post = require("../models/post");
let Subject = require("../models/subject");
let User = require("../models/user");

// Get all Posts
app.get("/posts", (req, res) => {
  Post.find({ state: true })
    .sort("date")
    .populate("creator", "name email")
    .exec((err, posts) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        posts,
      });
    });
});

// Get Post by Id
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .populate("creator", "username email role img")
    .exec((err, postDB) => {
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
            message: `Post with id ${id} not found`,
          },
        });
      }

      res.json({
        ok: true,
        postDB,
      });
    });
});

// Create new Post
app.post("/posts", [verifyToken], (req, res) => {
  let body = req.body;

  if (!ObjectId.isValid(body.subjectId)) {
    return res.status(400).json({
      ok: false,
      message: "subjectId must be a valid id",
    });
  }

  Subject.findById(body.subjectId, (err, subjectDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!subjectDB) {
      return res.status(400).json({
        ok: false,
        message: "subjectId must be an existing id",
      });
    }

    // Crear post amb API etherpad
    const now = new Date();
    const secondsSinceEpoch = Math.round(now.getTime() / 1000);
    let newPadID = req.user._id + secondsSinceEpoch;
    let etherpad = etherpadApi.connect({
      apikey: process.env.EAPI_KEY,
      host: process.env.EHOST,
      port: process.env.EPORT,
    });
    let args = {
      padID: newPadID,
    };

    etherpad.createPad(args, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          error,
        });
      }

      let newPost = new Post({
        title: body.title,
        date: body.date,
        body: body.body,
        subject: body.subjectId,
        creator: req.user._id,
        padID: newPadID,
      });

      newPost.save((err, postDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        Subject.findByIdAndUpdate(body.subjectId, {
          $push: { posts: newPost._id },
        }).exec();

        User.findByIdAndUpdate(req.user._id, {
          $push: { posts: newPost._id },
        }).exec();

        res.json({
          ok: true,
          post: postDB,
        });
      });
    });
  });
});

// Update Post values
app.put("/posts/:id", [verifyToken], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["title", "votes", "favs"]);
  if (body.votes) {
    body["meta.votes"] = body.votes;
    delete body.votes;
  }
  if (body.favs) {
    body["meta.favs"] = body.favs;
    delete body.favs;
  }

  Post.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, postDB) => {
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
            message: `Post with id ${id} not found`,
          },
        });
      }

      res.json({
        ok: true,
        post: postDB,
      });
    }
  );
});

// Add user to editors
app.put("/posts/:pid/:uid", [verifyToken], (req, res) => {
  let pid = req.params.pid; //post id
  let uid = req.params.uid; //user id to add
  // req.user._id --> user id that requests. Must be = post creator

  if (!ObjectId.isValid(pid)) {
    return res.status(400).json({
      ok: false,
      message: "Post ID must be a valid id",
    });
  } else if (!ObjectId.isValid(uid)) {
    return res.status(400).json({
      ok: false,
      message: "User ID must be a valid id",
    });
  }

  Post.findById(pid).exec((err, postDB) => {
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
          message: `Post with id ${pid} not found`,
        },
      });
    }

    if (postDB.creator != req.user._id) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Requesting User must be Post creator",
        },
      });
    }

    let body = {
      editors: postDB.editors,
    };
    if (body.editors.indexOf(uid) === -1) body.editors.push(uid);
    else {
      return res.status(400).json({
        ok: false,
        err: {
          message: `User ${uid} is already an editor`,
        },
      });
    }

    console.log(body);

    Post.findByIdAndUpdate(
      pid,
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
  });
});

// Delete Post
app.delete("/posts/:id", [verifyToken], (req, res) => {
  let id = req.params.id;

  Post.findByIdAndUpdate(id, { state: false }, { new: true }, (err, postDB) => {
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
          message: `Post with id ${id} not found`,
        },
      });
    }

    res.json({
      ok: true,
      message: `Post with id ${id} deleted`,
      post: postDB,
    });
  });
});

module.exports = app;
