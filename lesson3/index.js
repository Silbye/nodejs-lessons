const express = require("express");
const path = require("path");
const fs = require("fs");
const pathToData = path.join(__dirname, "views.json");

const app = express();

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  data.home++;
  fs.writeFileSync(pathToData, JSON.stringify(data, null, 2));
  res.send(`<h1>Home page</h1>
  <div>View count: ${data.home}</div>
  <a href="/about">To about</a>`);
});

app.get("/about", (req, res) => {
  const data = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  data.about++;
  fs.writeFileSync(pathToData, JSON.stringify(data, null, 2));
  res.send(`<h1>About page</h1>
  <div>View count: ${data.about}</div>
  <a href="/">To home</a>`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});
