// 1. Load required modules
import express from "express";
import bodyParser from "body-parser";
const app = express();

// 2. Middleware setup
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 3. In-memory storage for blog posts
let posts = [];

// 4. Routes

// Home Page
app.get("/", (req, res) => {
  res.render("home", 
    { posts: posts });
});

// Compose Page
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

// Handle New Post Submission
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

// Individual Post Page
app.get("/posts/:postTitle", (req, res) => {
    const requestedTitle = req.params.postTitle.toLowerCase();
    const index = posts.findIndex(p => p.title.toLowerCase() === requestedTitle);
    const post = posts[index];
    
    if (post) {
      res.render("post", { post: post, index: index }); // 👈 pass index too
    } else {
      res.status(404).send("Post not found");
    }
  });
  


app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    res.render("edit", { index, post });
});

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    posts[index] = {
      title: req.body.postTitle,
      content: req.body.postBody
    };
    res.redirect("/");
});


app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    posts.splice(index, 1); // remove from array
    res.redirect("/");
  });
  
  
  


  

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
