import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/auth/selectors';
import { selectUsername } from '../store/user/selectors';
import Dropdown from '../components/Dropdown';


export default function NavBar() {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUsername);
  const navigate = useNavigate();



  const options = [
    { label : "Profile", value: "/profile"},
    { label : "Edit Profile", value: "/edit-profile"},
    { label : 'Logout', value: '/logout'}
  ];

 function handleSubmit(event) {
  // console.log(event.target.search.value)
    event.preventDefault();
    const searchVariable = event.target.search.value
    navigate("/search?q=" + searchVariable)
  // const searchValue = event.target.value
  console.log(event.target.value)
 }


  return (
    <div className="navbar">
      <Link to="/"><h1>Repables</h1></Link>
      <nav>
        <Link to="/explore">Explore</Link>
        <Link to="/create">Create</Link>
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="search" name="search"/> 
      </form>
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
                <Link to={'/u/' + userName}>{userName}</Link>
              </Dropdown>
            
          )
          : null}
      </section>
    </div>
  );
}
