const express = require("express");

const { register, login} = require("./controllers/users.controller");
const postController = require("./controllers/post.controller");
const app = express();
app.use(express.json());
app.post("/register",register);
app.post("/login",login);
// console.log(postController);
app.use("/post",postController)

module.exports = app;