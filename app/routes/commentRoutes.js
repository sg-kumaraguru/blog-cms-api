import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { createCommentSchema } from "../schemas/commentSchema.js";
import {
  createComment,
  deleteComment,
  getMyComments,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/me", requireAuth, getMyComments);

commentRouter.post( "/post/:postId", requireAuth, validateSchema(createCommentSchema), createComment );

commentRouter.delete("/:id", requireAuth, deleteComment);

export default commentRouter;
