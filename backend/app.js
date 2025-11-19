import express from "express";
import cors from "cors";
import passport from "./passport.js";
import session from "express-session";

const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
//Index router
import PostsRouter from "./routes/postsRouter.js";
app.use("/posts", PostsRouter);

//Auth router
import AuthRouter from "./routes/authRouter.js";
app.use("/auth", AuthRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("Listening on port:", PORT);
});
