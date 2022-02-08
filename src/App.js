
import './App.css';
import { useState, useEffect } from 'react';
import Registration from './user-components/Registration';
import Login from './user-components/Login';

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
