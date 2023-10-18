import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserListContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  website: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Set the number of users per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'username'>('name'); // Default sorting key

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Sorting logic
  const sortedUsers = [...currentUsers].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  // Searching logic
  const filteredUsers = sortedUsers.filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <UserListContainer>
      <div>
        <label htmlFor="search">Search by Name:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter a name to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label>Sort by:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as 'name' | 'username')}
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
        </select>
      </div>
      <ul>
        {filteredUsers.map((user: User) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Website: {user.website}</p>
          </li>
        ))}
      </ul>

      <ul>
        {filteredUsers.map((user: User) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Website: {user.website}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastUser >= users.length}
      >
        Next
      </button>
    </UserListContainer>
  );
}

export default UserList;
