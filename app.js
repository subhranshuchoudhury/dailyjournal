// https://about.me/subhranshu
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Publish your passions your way. Whether you'd like to share your knowledge, experiences or the latest news, compose a unique and beautiful post.";
const aboutContent = "I am subhranshu on the way of full stack developer. This project is made for a challege by Angela Yu on Udemy platform.";
const contactContent = "Email: subhransuchoudhury00@gmail.com  Mobile: +918249587552";
const app = express();
let posts = [];



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { homeStartingContent, Posts: posts });


});

app.get("/posts/:blogTitle", (req, res) => {

  posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.blogTitle)) {
      res.render("post",{postTitle: post.title,postContent: post.content});
    }
    else{

    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {

  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  posts.push(post);

  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
