import './App.css';
import React from 'react';
import Header from './page-components/Header';
import Explore from './page-components/Explore';

import './scss/main.scss';

function App() {
  

  return (
    <div className="app">
      <Header />
      <main>
        <Explore />

      </main>
    </div>
  );
}

export default App;
