import React from 'react';

export default function Registration() {
  const submitForm = (evt) => {
    const payload = {};
    Array.from(evt.target).forEach((input) => {
      if (input.name) {
        payload[input.name] = input.value;
      }
    });

    evt.preventDefault();

    fetch('https://api.repables.com/user', { // the url address is subject to change
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="registration">
      <form onSubmit={submitForm}>
        <label>New User Registration Form</label>
        <br />
        <label htmlFor="username">Username: </label>
        <input id="username" placeholder="Username..." name="username" required />
        <label htmlFor="email">Email: </label>
        <input id="email" placeholder="Email..." name="email" />
        <label>Password: </label>
        <input placeholder="Password..." name="password" required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
