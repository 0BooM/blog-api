const { Router } = require("express");
const PostsRouter = Router();
const PostsController = require("../controllers/PostsController");

PostsRouter.get("/", PostsController.getPosts);

PostsRouter.get("/:id", PostsController.getPostById)

module.exports = PostsRouter;