import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";

interface Todo {
    username: string;
    id: number;
    name: string;
    email: string;
  }

  const UserListContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

function HomePage() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setTodos(data));
        }, []);

    function addTodo() {
        // Create a new todo object
        const newTodoObj = {
            username: newTodo,
            id: todos.length + 1,
            name: newTodo,
            email: newTodo,
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
      

    return <UserListContainer>
        <div>
            <h1>Todo List</h1>
            <Link to="/user-list">User List Page</Link>
            <br /><br />
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
                {todo.name}
                {/* <button onClick={() => editTodo(todo.id)}>Edit</button> */}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
    </UserListContainer>;
}

export default HomePage;