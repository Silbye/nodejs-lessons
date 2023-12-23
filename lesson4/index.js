const express = require("express");
const Joi = require("joi");
const path = require("path");
const fs = require("fs");
const pathToData = path.join(__dirname, "data.json");
const schema = Joi.object({
  name: Joi.string().min(1).required(),
  age: Joi.number().min(0).required(),
});
const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const users = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  const user = users.find((user) => user.id === id);
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.post("/users", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  let currid = users.length;
  currid++;
  let unique = false;
  while (unique === false) {
    const user = users.find((user) => user.id === currid);
    if (user) {
      currid++;
    } else {
      unique = true;
    }
  }
  users.push({ id: currid, ...req.body });
  fs.writeFileSync(pathToData, JSON.stringify(users, null, 2));
  res.send({ users });
});

app.put("/users/:id", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const id = +req.params.id;
  const users = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = req.body.name;
    user.age = req.body.age;
    fs.writeFileSync(pathToData, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const users = JSON.parse(fs.readFileSync(pathToData, "utf-8"));
  const user = users.find((user) => user.id === id);
  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFileSync(pathToData, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(3000);
