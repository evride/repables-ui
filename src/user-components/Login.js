import React from "react";

export default function Login(){

    const submitForm = (evt) => {
        evt.preventDefault();
        const payload = new FormData;

        Array.from(evt.target).forEach((input) => {
            if (input.name) {
                payload.append(input.name, input.value)

            }
        });
        
        fetch("/api/user/login", {
            method: "POST",
            body: payload
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return(
        <div>
            <form onSubmit={submitForm}>
                <label>User Login</label>
                <br></br>
                <label>Username</label>
                <input placeholder="Username..." name="username" required/>
                <label>Password</label>
                <input placeholder="Password..." name="password" required/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}