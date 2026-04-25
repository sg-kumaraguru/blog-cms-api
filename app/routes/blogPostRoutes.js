import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getMyPosts,
  publishPost,
  archivePost,
} from "../controllers/blogPostController.js";

import {createPostSchema, updatePostSchema} from "../schemas/blogPostSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const blogPostRouter = Router();

blogPostRouter.get("/me/all", requireAuth, getMyPosts);

blogPostRouter.post("/", requireAuth, validateSchema(createPostSchema), createPost);
blogPostRouter.put("/:id", requireAuth, validateSchema(updatePostSchema), updatePost);

blogPostRouter.patch("/:id/publish", requireAuth, publishPost);
blogPostRouter.patch("/:id/archive", requireAuth, archivePost);
blogPostRouter.delete("/:id", requireAuth, deletePost);

blogPostRouter.get("/", getPosts);
blogPostRouter.get("/:id", getPost);


export default blogPostRouter;
