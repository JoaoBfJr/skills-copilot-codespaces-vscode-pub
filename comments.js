// Create web server
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/comments", (req, res) => {
  const comment = req.body;
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const comments = JSON.parse(data);
      comments.push(comment);
      fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Comment added successfully");
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

