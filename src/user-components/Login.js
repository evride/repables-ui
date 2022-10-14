import React from 'react';
import { useDispatch } from 'react-redux';

import * as AuthTypes from '../store/auth/types';

export default function Login(store) {
  console.log(store);
  const dispatch = useDispatch();

  const submitForm = (evt) => {
    evt.preventDefault();
    const payload = {};
    Array.from(evt.target).forEach((input) => {
      if (input.name)   {
        payload[input.name] = input.value;
      }
    });
    dispatch({ type: AuthTypes.LOGIN });
    fetch('https://api.repables.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: AuthTypes.LOGIN_SUCCESS, payload: data });
        
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>User Login</label>
        <br />
        <label>Username</label>
        <input placeholder="Username..." name="username_or_email" required />
        <label>Password</label>
        <input placeholder="Password..." name="password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
