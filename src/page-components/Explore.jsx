import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from '../user-components/Login';
import Registration from '../user-components/Registration';
import ItemPage from '../item-components/ItemPage';
import User from '../user-components/User';
import Logout from '../user-components/Logout';
import EditProfile from '../user-components/EditProfile';
import UploadedItems from '../user-components/UploadItems';
import ResetPassword from '../user-components/ResetPassword';

export default function Body() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create" element={<ItemPage />} />
        <Route path="/profile" element={<User />} />
        <Route path='/edit-profile' element={<EditProfile/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/uploaded-items' element={<UploadedItems/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}
