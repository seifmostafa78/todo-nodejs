const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = req.body;
    const createdTodo = await new Todo(newTodo);
    await createdTodo.save();
    res.status(200).json({ message: "Todo created successfully", createdTodo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await Todo.findByIdAndDelete(id);
    response.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

module.exports = router;
