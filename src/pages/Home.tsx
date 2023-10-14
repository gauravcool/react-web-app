import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

function HomePage() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data));
        }, []);

    function addTodo() {
        // Create a new todo object
        const newTodoObj = {
            userId: 1,
            id: todos.length + 1,
            title: newTodo,
            completed: false,
        };
        
        // Update the state
        setTodos([...todos, newTodoObj]);
        setNewTodo('');
    }

    function editTodo(id: number) {
    // Find the todo to edit
        const todoToEdit = todos.find((todo) => todo.id === id);
    // Implement your edit logic (e.g., opening a modal and saving changes)
    }
    
    function deleteTodo(id: number) {
    // Filter out the todo to delete
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }
      

    return <>
        <div>
            <h1>Todo List</h1>
            <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>

            <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                {todo.title}
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
    </>;
}

export default HomePage;