import React, {useState} from "react";



export default function Registration  (){
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')

    const submitForm = (evt) => { 
         const payload = new FormData()
         Array.from(evt.target).forEach((input) => {
               if (input.name) {
                   payload.append(input.name, input.value);
               }
         });

         evt.preventDefault();
        
        fetch("/api/user/register", {
            method: "POST",
            body: payload
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    };

    return(
        <div className="registration">
            <form onSubmit={submitForm}>
                <label>New User Registration Form</label>
                <br></br>
                <label>Username: </label>
                <input placeholder="Username..." value={username} name="username" required onChange={(e) => setUsername(e.target.value)}/>
                <label>Email: </label>
                <input placeholder="Email..." value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input placeholder="Password..."  name="password" required /> 
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
