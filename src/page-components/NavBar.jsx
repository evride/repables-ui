import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/auth/selectors';
import { selectUsername } from '../store/user/selectors';
import Dropdown from '../components/Dropdown';


export default function NavBar() {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUsername);
  


  const options = [
    { label : "Profile", value: "/profile"}, 
    { label : "Edit Profile", value: "/edit-profile"},
    { label : "Uploaded Items", value: "/uploaded-items"},
    { label : 'Logout', value: '/logout'}
  ];

 


  return (
    <div className="navbar">
      <Link to="/"><h1>Repables</h1></Link>
      <nav>
        <Link to="/explore">Explore</Link>
        <Link to="/create">Create</Link>
      </nav>
      <section className="user-links">
        { !isLoggedIn
                  && (
                  <>
                    <Link to="/login">Login</Link>
                    <span>|</span>
                    <Link to="/registration">Register</Link>
                  </>
                  )}
        {isLoggedIn
          ? (
              <Dropdown options={options} >
                <a>{userName}</a>
              </Dropdown>
            
          )
          : null}
      </section>
    </div>
  );
}
