const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('combined'));

let todoItems = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];


app.get('/', (req, res) => {
  res.status(200).send({status: 'ok'})
})

app.get('/api/TodoItems', (req, res) => {
  res.send(todoItems)
})

app.get('/api/TodoItems/:itemId', (req, res) => {
  let itemId = req.path.split('/')[3]
  let selectedItem = todoItems.filter(item => item.todoItemId == itemId)

  res.send(selectedItem[0])
})

app.post('/api/TodoItems', (req, res) =>{
  let reqData = req.body;
  let reqItemId = reqData.todoItemId;
  if(todoItems.filter(item => item.todoItemId === reqItemId) == false) {
    todoItems.push(reqData);
  } else {
    todoItems.splice(reqItemId, 1, reqData)
  }  
  res.status(201).send(reqData)
})

app.delete('/api/TodoItems/:number', (req, res) => {
  let itemId = req.path.split('/')[3]
  let deletedItem = todoItems.splice(itemId, 1)

  res.status(200).send(deletedItem[0])
})

module.exports = app;
