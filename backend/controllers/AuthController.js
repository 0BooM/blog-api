const passport = require("../passport");
const bcrypt = require("bcryptjs");
const supabase = require("../supabaseClient");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {

      if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).json({
          error: "Password should be at least 6 characters.",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const username = req.body.username;
      if(!username){
        return res.status(400).json({
          error: "Pass in correct username",
        });
      }

      const email = req.body.email || null;

      const { error } = await supabase
        .from("User")
        .insert({ username, password: hashedPassword, email });

      if (error) {
        if (error.code === "23505") {
          return res
            .status(400)
            .json({ error: "User with this username already exists" });
        }
        
        console.error(error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ error: "Already authenticated" });
    }
  } catch (error) {
    return res.sendStatus(400);
  }
};
