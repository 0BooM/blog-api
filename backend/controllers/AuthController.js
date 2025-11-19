import passport from "../passport.js";
import bcrypt from "bcryptjs";
import supabase from "../supabaseClient.js";
import "dotenv/config";

import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).json({
          error: "Password should be at least 6 characters.",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const username = req.body.username;
      if (!username) {
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

export const login = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({ error: info.message || "Login failed" });
      }
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.status(200).json({ message: "Login successful", token, user });
    })(req, res, next);
  } catch (err) {
    res.status(500).json("Couldn't log you in");
  }
};
