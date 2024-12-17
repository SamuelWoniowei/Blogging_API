import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    state: {
      type: String,
      enum: ["draft", "published", "archived"],
      required: true,
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model("Article", articleSchema);
export default Article;
