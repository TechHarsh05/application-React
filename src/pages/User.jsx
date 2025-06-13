import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './user.module.css'; // import the CSS module

const User = () => {
  const { state } = useLocation();
  const user = state?.user;

  if (!user) return <p>No user data available.</p>;

  return (
    <div className={styles.container}>
      <div id={styles.userImage}>
      {user.userImage && (
        <img
        src={`data:image/jpeg;base64,${user.userImage}`}
        alt={`${user.name}'s profile`}
        className={styles.profileImage}
        />
      )}
      </div>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.detail}>ID: {user.id}</div>
      <div className={styles.detail}>Email: {user.email}</div>
      <div className={styles.detail}>Phone: {user.phone}</div>
    </div>
  );
};

export default User;
