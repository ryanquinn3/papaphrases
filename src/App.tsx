import React from 'react';
import './App.css';
import { Board } from './Board';
import { store } from './store';
import {StoreProvider} from "easy-peasy";

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
    <div className="App">
      <Board/>
    </div>
    </StoreProvider>
  );
}

export default App;
