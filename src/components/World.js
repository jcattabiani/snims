import React, { useState } from 'react';
import '../styles.css';
import SnailButton from './SnailButton';
import Snail from './Snail';

const defaultSnails = [
  { color: 'green', name: 'Goopie', id: 1 },
  { color: 'orange', name: 'TJ Cream', id: 2 },
  { color: 'blue', name: 'Glubtubbis Wepple', id: 3 },
  { color: 'red', name: 'Eren', id: 4 },
  // { color: 'purple', name: '5', id: 5 },
  // { color: 'yellow', name: '6', id: 6 },
  // { color: 'cyan', name: '7', id: 7 },
  // { color: 'magenta', name: '8', id: 8 },
];

const World = () => {
  const [snails, setSnails] = useState(defaultSnails);

  const updateSnails = (snailId, newPosition, available) => {
    setSnails((prevSnails) =>
      prevSnails.map((snail) => (snail.id === snailId ? { ...snail, position: newPosition, available: available } : snail))
    );

  };

  const addSnail = (snail) => {
    setSnails((prevSnails) => [...prevSnails, snail]);
  };

  return (
    <div className="fullscreen-container">
      <div>
        {snails.map((snail, index) => (
          <Snail
            key={index}
            color={snail.color}
            name={snail.name}
            distanceThreshold={100}
            // snailPositions={snails.reduce((positions, snail) => {
            //   positions[snail.id] = {position: snail.position};
            //   return positions;
            // }, {})}
            snails={snails}
            updateSnails={updateSnails}
            snail={snail}
          />
        ))}
      </div>
      <div className="bottom-right-component">
        <SnailButton onSnailSubmit={addSnail} />
      </div>
    </div>
  );
};

export default World;