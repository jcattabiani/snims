import React, { useEffect, useState } from 'react';

const Snail = ({ color, name }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [target, setTarget] = useState(getRandomTargetPosition());
  const stepSize = 1;
  const requestIdRef = React.useRef(null);

  function getRandomTargetPosition() {
    const range = Math.min(window.innerWidth, window.innerHeight) * 0.4;
    const newTarget = {
      x: Math.random() * range + (window.innerWidth / 2 - range / 2),
      y: Math.random() * range + (window.innerHeight / 2 - range / 2),
    };

    return {
      x: Math.max(Math.min(newTarget.x, window.innerWidth), 0),
      y: Math.max(Math.min(newTarget.y, window.innerHeight), 0),
    };
  }

  const moveAgent = () => {
    const prevPosition = position;
    const deltaX = target.x - prevPosition.x;
    const deltaY = target.y - prevPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Check if the agent has reached the target position
    if (distance <= stepSize) {
      // Calculate a new target position within a certain range
      setTarget(getRandomTargetPosition());
    }

    // Calculate the normalized direction vector towards the target
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;

    // Calculate the new position by moving towards the target
    const newPosition = {
      x: prevPosition.x + directionX * stepSize,
      y: prevPosition.y + directionY * stepSize,
    };

    setPosition(newPosition);
    requestIdRef.current = requestAnimationFrame(moveAgent);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(moveAgent);

    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, target]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '20px',
        height: '20px',
        backgroundColor: color,
      }}
    >
      {name}
    </div>
  );
};

export default Snail;
