import React, { useEffect, useRef, useState } from 'react';

const DialogueDisplay = ({ dialogue, snail }) => {
  const [displayedLineIndex, setDisplayedLineIndex] = useState(0);

  const dialogueLines = dialogue.lines;
  const { x, y } = snail.position; 
  const { left } = dialogue;
  const lineCycleTime = 2000;

  useEffect(() => {

    if (displayedLineIndex >= dialogueLines.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedLineIndex(prevIndex => prevIndex + 1);
    }, lineCycleTime);

    return () => clearTimeout(timeout);
  }, [displayedLineIndex, dialogueLines.length]);

  const currentLine = dialogueLines[displayedLineIndex] || '';

  const dialogueStyle = {
    position: 'absolute',
    top: y,
    maxWidth: '100px',
    overflowWrap: 'break-word',
    left: left ? x - 100 : x + 50
  };

  return (
    <div style={dialogueStyle}>
      {currentLine}
    </div>
  );
};

export default DialogueDisplay;
