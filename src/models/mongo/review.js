import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  reviewTitle: String,
  rating: Number,
  comment: String,
  reply: String,  
  projectid: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);