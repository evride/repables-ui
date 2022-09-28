import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as AuthTypes from '../store/auth/types';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: AuthTypes.LOGOUT })
      navigate('/');
    }, 1)
    
  },[]);

  return (
    <div>
      
    </div>
  );
}
