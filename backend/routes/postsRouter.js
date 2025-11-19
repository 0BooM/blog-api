import { Router } from "express";
import * as PostsController from "../controllers/PostsController.js";
import authenticateJWT from "../utils/authenticateJWT.js";

const PostsRouter = Router();

PostsRouter.get("/", PostsController.getPosts);

PostsRouter.get("/:id", PostsController.getPostById);

PostsRouter.get("/:id/comments", PostsController.getPostComments);
PostsRouter.post("/:id/comments", authenticateJWT, PostsController.postPostComments);

export default PostsRouter;
