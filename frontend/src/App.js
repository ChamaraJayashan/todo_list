import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:5000/api/todos");
    setTodos(data);
  };

  const addTodo = async (text) => {
    const { data } = await axios.post("http://localhost:5000/api/todos", {
      text,
    });
    setTodos((prev) => [...prev, data]);
  };

  const updateTodo = async (id, updates) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      updates
    );
    setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
