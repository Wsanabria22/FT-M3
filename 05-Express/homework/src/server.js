// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
// server.get("/posts", function(req, rest){
//   rest.send(
//     '<head><body>\
//     <form method="POST" action="/posts">\
//       Author <input name="author" type="text"><br>\
//       Title <input name="title" type="text"><br>\
//       Contents <input name="contents" type="text"><br>\
//       <input type="submit">\
//       </form>\
//     </body></head>'
//   )
// })

server.use(express.urlencoded({ extended: false }));
server.post("/posts", function (req, res) {
  if (!req.body.author || !req.body.title || !req.body.contents) {
    let error = {
      error: "No se recibieron los parámetros necesarios para crear el Post"
    }
    res.status(STATUS_USER_ERROR).json(error);
  } else {
    let idPost = posts.length + 1;
    let post = {
      author: req.body.author,
      title : req.body.title,
      contents: req.body.contents,
      id: idPost
    }
    posts.push(post);
    return res.json(post);
  }
});

server.post("/posts/author/:author", function (req, res) {
  if (!req.params.author || !req.body.title || !req.body.contents) {
    let error = {
      error: "No se recibieron los parámetros necesarios para crear el Post"
    }
    res.status(STATUS_USER_ERROR).json(error);
  } else {
    let idPost = posts.length + 1;
    let post = {
      author: req.params.author,
      title : req.body.title,
      contents: req.body.contents,
      id: idPost
    }
    posts.push(post);
    return res.json(post);
  }
});

server.get("/posts", function(req, res) {
  if (req.query.term) {
    let result = posts.filter((post) => post.title.includes(req.query.term) || post.contents.includes(req.query.term));
    res.json(result);
  }
  else res.json(posts);
});

server.get("/posts/:author", function(req, res) {
  if (req.params.author) {
    let result = posts.filter((post) => post.author.includes(req.params.author));
    if (result.length > 0 ) res.json(result);
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
  }
});

server.get("/posts/:author/:title", function(req, res) {
  if (req.params.author && req.params.title) {
    let result = posts.filter((post) => post.author.includes(req.params.author) &&
      post.title.includes(req.params.title));
    if (result.length > 0 ) res.json(result);
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
  }
});

server.put("/posts", function(req, res) {
  if (req.body.id && req.body.title && req.body.contents) {
    let idPost = posts.findIndex((post)=> post.id === req.body.id)
    if (idPost > 0) {
      posts[idPost].title = req.body.title;
      posts[idPost].contents = req.body.contents;
      res.json(posts[idPost])
    } else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho id"});
  } else res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
})

server.delete("/posts", function(req, res) {
  if (req.body.id) {
    let post = posts.find((post)=> post.id === req.body.id)
    if (post) {
      posts = posts.filter(post=> post.id !== req.body.id);
      res.json({ success: true });
    } else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho id"});
  } else res.status(STATUS_USER_ERROR).json({error: "No se recibio el id necesario para eliminar el Post"});
})


server.delete("/author", function(req, res) {
  if (req.body.author) {
    let postsAuthor = posts.filter((post)=> post.author === req.body.author)
    if (postsAuthor.length) {
      posts = posts.filter(post=> post.author !== req.body.author);
      res.json(postsAuthor);
    } else res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
  } else res.status(STATUS_USER_ERROR).json({error: "No se recibio el author necesario para eliminar los Posts"});
})


module.exports = { posts, server };
