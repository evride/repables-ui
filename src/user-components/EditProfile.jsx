import React, {useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/auth/selectors";


export default function EditProfile (){

    const token = useSelector(selectToken);
    const [profile, setProfile] = useState({})
    

    const handleSave = (evt) => {
    
        evt.preventDefault();
        const payload = {};
        Array.from(evt.target).forEach((input) => {
            if (input.name && input.type !== 'file') {
                payload[input.name] = input.value;
            }
        });

        fetch('https://api.repables.com/user', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProfile(data);
        });
    };

    useEffect(() => {
        fetch('https://api.repables.com/me', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProfile(data);
        });
    }, []);
    return(
        <div>
            <form onSubmit={handleSave}>
                <div className="form-row">
                    <label>Fullname</label>
                    <input id="fullname" name="fullname" defaultValue={profile.fullname}/>
                </div>
                <div className="form-row">
                    <label>Location</label>
                    <input id="location" name="location" defaultValue={profile.location}/>
                </div>
                <div className="form-row">
                    <label>Company</label>
                    <input id="company" name="company" defaultValue={profile.company}/>
                </div>
                <div className="form-row">
                    <label>Biography</label>
                    <textarea id="biography" name="biography" defaultValue={profile.biography}/>
                </div>
                <div className="form-row">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}