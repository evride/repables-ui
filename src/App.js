
import './App.css';
import { useState, useEffect } from 'react';
import Registration from './user-compents/Registration';
import Login from './user-compents/Login';

function App() {
  return (
    <div className="app">
      <header className="app-header">
	<Registration/>
        <Login/>
      </header>
    </div>
  );
}

export default App;
