/* Schema for climbing-posts */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const climbingSchema = Schema({
  name: String,
  grade: String,
  area: String,
  description: String,
  type: String,
  createdAt: Date
});

module.exports = mongoose.model("climbing", climbingSchema);