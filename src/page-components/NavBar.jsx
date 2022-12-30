import React from 'react';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUsername } from '../store/auth/selectors';
import Dropdown from '../components/Dropdown';
import SearchInput from "../components/SearchInput"


export default function NavBar() {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUsername);
 
  const options = [
    { label : "Profile", value: "/profile"},
    { label : "Edit Profile", value: "/edit-profile"},
    { label : 'Logout', value: '/logout'}
  ];

  return (
    <div className="navbar">
      <Link to="/"><h1>Repables</h1></Link>
      <nav>
        <Link to="/explore">Explore</Link>
        <Link to="/create">Create</Link>
        <div className="input-search">  
          <SearchInput />
        </div>
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
