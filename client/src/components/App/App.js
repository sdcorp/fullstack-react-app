import React from 'react';
import styles from './App.module.scss';
import API from '../API';

function App() {
  return (
    <header className={styles.header}>
      <API />
    </header>
  );
}

export default App;
