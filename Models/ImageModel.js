import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  seenCount: {
    type: "Number",
    default: 0,
  },
  imgUrl: {
    type: "String",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Image", imageSchema);
