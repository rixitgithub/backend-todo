const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//functions

function findIndex(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === index) return i;
  }
  return -1;
}

function removeIndex(arr, index) {
  let newTodo = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      newTodo.push(arr[i]);
    }
  }
  return newTodo;
}

//routes

app.get("/todos", (req, res) => {
  fs.readFile("todo.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todo.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("todo.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeIndex(todos, todoIndex);
      fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3002);
