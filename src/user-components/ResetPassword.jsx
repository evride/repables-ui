import React from "react";

export default function ResetPassword() {

    const handleResetPasswordForm = (evt) => {
        evt.preventDefault();

        const payload = {};
        Array.from(evt.target).forEach((input) => {
            if (input.name !== ''){
                payload[input.name] = input.value;
            }
            
        });

        fetch('https://api.repables.com/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    };

    return(
        <div className="password-reset-form">
            <form onSubmit={handleResetPasswordForm}>
                <label>Reset Password</label>
                <br />
                <label htmlFor="username-or-email">Username or Email</label>
                <input placeholder="Email..." name="email" required />
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}