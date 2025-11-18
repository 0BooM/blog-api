const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("./passport");
const session = require("express-session");

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
const PostsRouter = require("./routes/postsRouter");
app.use("/posts", PostsRouter);

//Auth router
const AuthRouter = require("./routes/authRouter");
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
