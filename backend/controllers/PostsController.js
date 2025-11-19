import supabase from "../supabaseClient.js";

export const getPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Post")
      .select("id, title, content, posted_at, author:author_id(username)");
    if (error) {
      console.error(error);
      res.sendStatus(500);
    }

    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) {
      console.log(error);
      res.sendStatus(500);
    }

    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getPostComments = async (req, res) => {
  const postId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("Comment")
      .select("id, content, author:author_id(username), post_id, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      res.sendStatus(500);
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const postPostComments = async (req, res) => {
  const postId = req.params.id;
  try {
    const author_id = req.user.id; // From JWT
    const content = req.body.content;
    const { data, error } = await supabase
      .from("Comment")
      .insert([{ content, author_id, post_id: postId }])
      .select();
    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    if (!data || !data[0]) {
      return res.status(400).json({ error: "Comment not created" });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
