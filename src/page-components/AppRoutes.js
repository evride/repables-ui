import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from '../user-components/Login';
import Registration from '../user-components/Registration';
import ItemPage from '../item-components/ItemPage';
import User from '../user-components/User';
import Logout from '../user-components/Logout';
import EditProfile from '../user-components/EditProfile';
import ItemViewPage from '../item-components/ItemViewPage'
import Explore from './Explore'

function AppRoutes() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create" element={<ItemPage />} />
        <Route path="/user" element={<User />} />
        <Route path='/edit-profile' element={<EditProfile/>}/>
        <Route path='/logout' element={<Logout/>} />
        <Route path='/r/:itemId' element={<ItemViewPage/>} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </div>
  );
}

export default AppRoutes