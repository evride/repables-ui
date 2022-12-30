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
        <label className="registration-label">New User Registration Form</label>
        <br />
          <div className="registration-form-design">
            <label htmlFor="username" className="registration-creds-design">Username: </label>
            <input id="username" className="registration-design" placeholder="Username..." name="username" required />
            <label htmlFor="email" className="registration-creds-design">Email: </label>
            <input id="email" className="registration-design" placeholder="Email..." name="email" />
            <label className="registration-creds-design" htmlFor="password">Password: </label>
            <input className="registration-design" id="password" placeholder="Password..." name="password" required />
            <input className="registration-btn" type="submit" value="Submit" />
          </div>
      </form>
    </div>
  );
}
