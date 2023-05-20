
import React from 'react';
import '../styles.css';
import SnailButton from './SnailButton';

const World = () => {
  return (
    <div className="fullscreen-container">
      <div className="content-container">
        <h1>The World</h1>
      </div>
      <div className="bottom-right-component">
        <SnailButton />
      </div>
    </div>
  );
};

export default World;