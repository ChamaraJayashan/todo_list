import React, { useState } from "react";
import styles from "./TodoList.module.css";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editId, setEditId] = useState(null); // State to track the todo being edited
  const [editText, setEditText] = useState(""); // State for the edited text

  const handleEdit = (todo) => {
    setEditId(todo._id); // Set the ID of the todo being edited
    setEditText(todo.text); // Set the current text of the todo
  };

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      updateTodo(id, { text: editText }); // Update the todo with the new text
      setEditId(null); // Reset the editing state
      setEditText("");
    }
  };

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <li key={todo._id} className={styles.item}>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodo(todo._id, { completed: !todo.completed })
              }
              className={styles.checkbox}
            />
            {editId === todo._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.editInput}
              />
            ) : (
              <span
                className={`${styles.itemText} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>
          {editId === todo._id ? (
            <button
              onClick={() => handleEditSubmit(todo._id)}
              className={styles.saveButton}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleEdit(todo)}
              className={styles.editButton}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteTodo(todo._id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
