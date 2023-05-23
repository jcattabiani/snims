
import React, { useState } from 'react';
import '../styles.css';
import SnailButton from './SnailButton';
import Snail from './Snail';

const defaultSnails = [
  { color: 'green', name: 'Goopie', id: 1 },
  { color: 'yellow', name: 'TJ Cream', id: 2 },
  { color: 'cyan', name: 'Glubtubbis Wepple', id: 3 },
  { color: 'red', name: 'Eren', id: 4 },
];



const World = () => {
  const [snails, setSnails] = useState(defaultSnails);

  const addSnail = (snail) => {
    setSnails((prevSnails) => [...prevSnails, snail]);
  };

  return (
    <div className="fullscreen-container">
      <div>
        {snails.map((snail, index) => (
          <Snail key={index} color={snail.color} name={snail.name} />
        ))}
      </div>
      <div className="bottom-right-component">
        <SnailButton onSnailSubmit={addSnail}/>
      </div>
    </div>
  );
};

export default World;