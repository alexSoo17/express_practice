const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have name"],
    unique: true,
    trim: true,
    maxLength: [20, "A tour name length should blow 20"],
    minLength: [5, "A tour name length should over 5"],
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "The tour difficulty should be either: easy|medium|hard",
    },
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return this.price > val;
      },
      message: "The priceDiscount should below the origin price",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
