
import React from 'react';
import '../styles.css';
import SnailButton from './SnailButton';
import Snail from './Snail';

const snails = [
  { color: 'green', name: 'Goopie', id: 1 },
  { color: 'yellow', name: 'TJ Cream', id: 2 },
  { color: 'cyan', name: 'Glubtubbis Wepple', id: 3 },
  { color: 'red', name: 'Eren', id: 4 },
];

const World = () => {
  return (
    <div className="fullscreen-container">
      <div>
        {snails.map((snail) => (
          <Snail key={snail.id} color={snail.color} name={snail.name} />
        ))}
      </div>
      <div className="bottom-right-component">
        <SnailButton />
      </div>
    </div>
  );
};

export default World;