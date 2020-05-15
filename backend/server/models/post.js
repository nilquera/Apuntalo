const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  editors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  padID: {
    type: String,
    required: true,
  },
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 },
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

postSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = mongoose.model("Post", postSchema);
