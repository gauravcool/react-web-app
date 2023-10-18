import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";

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
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

interface Photo {
  url: string;
}

function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<string>('');

  useEffect(() => {
    // Fetch user details
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data: User) => setUser(data));

    // Fetch user's profile picture
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/photos`)
      .then((response) => response.json())
      .then((photos: Photo[]) => setUserPhoto(photos[0]?.url || ''));
  }, [userId]);

  return (
    <UserListContainer>
      <h2>User Details</h2>
      {user ? (
        <div>
          <p>Full Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Address: {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}</p>
          <img src={userPhoto} alt={`${user.name}'s Profile`} />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <Link to="/user-list">Back to User List</Link>
    </UserListContainer>
  );
}

export default UserDetailPage;
