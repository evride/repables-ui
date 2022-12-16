import './App.css';
import React from 'react';
import Header from './page-components/Header';
import AppRoutes from './page-components/AppRoutes';

import './scss/main.scss';

function App() {

  return (
    <div className="app">
      <Header />
      <main>
        <AppRoutes />

      </main>
    </div>
  );
}

export default App;
