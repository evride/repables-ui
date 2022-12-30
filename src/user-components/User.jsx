import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../store/auth/selectors';

export default function User() {
  const userName = useSelector(selectUsername);

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
}
