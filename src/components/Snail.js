import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const Snail = ({ color, name }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [target, setTarget] = useState(getRandomTargetPosition());
  const stepSize = 0.5;
  const trailFadeDuration = 5000; // Duration in milliseconds for the color trail to fade out
  const trailFadeInterval = 16; // Interval in milliseconds to update the trail opacity
  const trailRef = useRef([]);
  const requestIdRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  function getRandomTargetPosition() {
    const range = Math.min(window.innerWidth, window.innerHeight);
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

    // Update the color trail
    updateTrail(prevPosition, color);

    setPosition(newPosition);
    requestIdRef.current = requestAnimationFrame(moveAgent);
  };

  const updateTrail = (position, color) => {
    trailRef.current.push({ position, color, opacity: 1, timestamp: Date.now() });

    // Remove old trail segments
    const currentTime = Date.now();
    while (trailRef.current.length > 0 && currentTime - trailRef.current[0].timestamp > trailFadeDuration) {
      trailRef.current.shift();
    }

    // Update trail opacity
    trailRef.current.forEach((segment) => {
      const segmentAge = currentTime - segment.timestamp;
      segment.opacity = Math.max(0, 1 - segmentAge / trailFadeDuration);
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(moveAgent);

    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [position, target]);

  useEffect(() => {
    // Clear the trail when the component unmounts
    return () => {
      trailRef.current = [];
    };
  }, []);

  useEffect(() => {
    // Update the trail opacity at a regular interval
    const intervalId = setInterval(() => {
      trailRef.current = trailRef.current.filter((segment) => segment.opacity > 0);
    }, trailFadeInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trailRef.current.map((segment, index) => {
        const gradientColor = `linear-gradient(90deg, ${segment.color} 0%, white 100%)`;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${segment.position.y}px`,
              left: `${segment.position.x}px`,
              width: '20px',
              height: '20px',
              background: gradientColor,
              opacity: segment.opacity,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          backgroundColor: color,
          cursor: 'pointer',
        }}
      >
        {isHovered && (
          <span style={{ marginLeft: '25px', whiteSpace: 'nowrap' }}>
            {name}
          </span>
        )}
        <Icon icon="mdi:snail" color={'white'} width="30"/>
      </div>
    </div>
  );
};

export default Snail;
