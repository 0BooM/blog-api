import { Router } from "express";
import { getPosts, getPostById } from "../controllers/PostsController.js";

const PostsRouter = Router();

PostsRouter.get("/", getPosts);

PostsRouter.get("/:id", getPostById);

export default PostsRouter;
