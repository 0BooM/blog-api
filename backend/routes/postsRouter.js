import { Router } from "express";
import * as PostsController from "../controllers/PostsController.js";

const PostsRouter = Router();

PostsRouter.get("/", PostsController.getPosts);

PostsRouter.get("/:id", PostsController.getPostById);

PostsRouter.get("/:id/comments", PostsController.getPostComments);

export default PostsRouter;
