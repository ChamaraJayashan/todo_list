const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });
  await todo.save();
  res.status(201).json(todo);
});

// Update a todo
router.put('/:id', async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
  res.json(todo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
