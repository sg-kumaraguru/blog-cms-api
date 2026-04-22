import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, },
    tags: [ { type: String, trim: true, }, ],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", },
    content: { type: String, required: true, },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
