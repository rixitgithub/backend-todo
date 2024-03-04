const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let todos = [];

//functionssssss

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

//routessssss

app.get("/todos", (req, res) => {
  res.json(todos);
});

var ctr = 1;
app.post("/todos", (req, res) => {
  const newTodo = {
    id: ctr, //unique
    //id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  ctr = ctr + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.listen(3002);
