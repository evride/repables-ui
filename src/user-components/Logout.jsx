import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as AuthTypes from '../store/auth/types';

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
    <>
    </>
  )
}
