import React, { useState } from 'react';
import '../styles.css';
import SnailButton from './SnailButton';
import Snail from './Snail';
import apiService from '../services/apiService.js';
import DialogueDisplay from './DialogueDisplay';
const defaultSnails = [
  { color: 'green', name: 'Douglas', id: 1, lines: [] },
  { color: 'orange', name: 'Mango', id: 2, lines: [] },
  { color: 'blue', name: 'Mitts', id: 3, lines: [] },
  { color: 'red', name: 'Jeremy', id: 4, lines: [] },
  // { color: 'purple', name: '5', id: 5 },
  // { color: 'yellow', name: '6', id: 6 },
  // { color: 'cyan', name: '7', id: 7 },
  // { color: 'magenta', name: '8', id: 8 },
];

const World = () => {
  const [snails, setSnails] = useState(defaultSnails);
  const [isPaused, setIsPaused] = useState(false);
  const [dialogues, setDialogues] = useState([]);

  const updateSnails = (snailId, newPosition, available) => {
    setSnails((prevSnails) =>
      prevSnails.map((snail) => (snail.id === snailId ? { ...snail, position: newPosition, available: available } : snail))
    );
  };

  const addSnail = (snail) => {
    setSnails((prevSnails) => [...prevSnails, snail]);
  };

  const handlePausePlay = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const initInteraction = (s1, s2) => {
    apiService.simulateDialogue(s1, s2, handleDialogue);
  }

  const handleDialogue = (s1, s2, dialogue) => {
    console.log(dialogue);
    let lines1 = [];
    let lines2 = [''];
    dialogue.forEach((line, i) => {
      (i%2 === 0) ? lines1 = lines1.concat([line, '']) : lines2 = lines2.concat([line, '']);
    });
    const s1Left = s1.position.x < s2.position.left;
    const dialogue1 = {
      id: s1.id,
      first: true,
      left: s1Left,
      lines: lines1,
    }
    const dialogue2 = {
      id: s2.id,
      first: false,
      left: !s1Left,
      lines: lines2,
    }
    const newDialogues = dialogues;
    setDialogues(newDialogues.concat([dialogue1, dialogue2]));
    
  }

  return (
    <div className="fullscreen-container">
      <div>
        {snails.map((snail, index) => (
          <Snail
            key={index}
            color={snail.color}
            name={snail.name}
            distanceThreshold={100}
            snails={snails}
            updateSnails={updateSnails}
            snail={snail}
            lines = {snail.lines}
            isPaused={isPaused}
            initInteraction={initInteraction}
            dialogue={dialogues.filter(dialogue => dialogue.id === snail.id)}
          />
        ))}
        {dialogues.map((dialogueObject, index) => (
          <DialogueDisplay 
            key={index}
            dialogue={dialogueObject}
            snail={snails.find(snail => snail.id === dialogueObject.id)}
          />
        ))}
      </div>
      <div className="top-right-component">
        <button onClick={handlePausePlay}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
      </div>
      <div className="bottom-right-component">
        <SnailButton onSnailSubmit={addSnail} />
      </div>
    </div>
  );
};

export default World;
