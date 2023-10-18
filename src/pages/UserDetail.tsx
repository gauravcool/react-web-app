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
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserPhoto = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/photos`);
        const photos: Photo[] = await response.json();
        setUserPhoto(photos[0]?.url || '');
      } catch (error) {
        console.error('Error fetching user photo:', error);
      }
    };

    fetchUserDetails();
    fetchUserPhoto();
  }, [userId]);

  return (
    <UserListContainer>
      <Link to="/user-list">Back to User List</Link>

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
    </UserListContainer>
  );
}

export default UserDetailPage;
