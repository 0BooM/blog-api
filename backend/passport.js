import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import supabase from "./supabaseClient.js";

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const { data: user, error } = await supabase
        .from("User")
        .select("*")
        .eq("username", username)
        .single();

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", id)
      .single();

    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

export default passport;
