const { Router } = require("express");
const AuthRouter = Router();
const AuthController = require("../controllers/AuthController"); 

AuthRouter.post("/signup", AuthController.signup);

module.exports = AuthRouter;