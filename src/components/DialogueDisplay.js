import React, { useEffect, useState } from 'react';
import '../styles.css';

const DialogueDisplay = ({ dialogue, snail, finishDialogue }) => {
  const [displayedLineIndex, setDisplayedLineIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const dialogueLines = dialogue.lines;
  const { x, y } = snail.position;
  const { left } = dialogue;
  const lineCycleTime = 2000;

  useEffect(() => {
    if (displayedLineIndex >= dialogueLines.length) {
      finishDialogue(dialogue.id);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedLineIndex(prevIndex => prevIndex + 1);
      setFadeIn(true);
    }, lineCycleTime);

    return () => clearTimeout(timeout);
  }, [displayedLineIndex, dialogueLines.length]);

  const currentLine = dialogueLines[displayedLineIndex] || '';

  const dialogueStyle = {
    position: 'absolute',
    top: y,
    maxWidth: '100px',
    overflowWrap: 'break-word',
    left: left ? x - 100 : x + 50,
    animation: fadeIn ? 'fade-in 0.5s ease-in-out forwards' : 'none',
  };

  return (
    <div style={dialogueStyle}>
      {currentLine}
    </div>
  );
};

export default DialogueDisplay;
