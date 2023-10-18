import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Set the number of users per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name'); // Default sorting key

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

//   pagination, and 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Implement sorting, 
  const sortedUsers = [...currentUsers].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });


// searching logic here
  const filteredUsers = sortedUsers.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div>
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
      <ul>
        {filteredUsers.map((user: any) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Website: {user.website}</p>
          </li>
        ))}
      </ul>

      <ul>
        {filteredUsers.map((user: any) => (
            <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Website: {user.website}</p>
            </li>
        ))}
      </ul>

      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
        </button>
        <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastUser >= users.length}
        >
        Next
        </button>


    </div>
  );
}

export default UserList;
