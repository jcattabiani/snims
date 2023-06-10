import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const Snail = ({ color, name, snails, updateSnails, snail, isPaused, initInteraction }) => {
  const [position, setPosition] = useState(getRandomTargetPosition());
  const [target, setTarget] = useState(getRandomTargetPosition());
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);
  const [available, setAvailable] = useState(true);
  const [displayText, setDisplayText] = useState('');

  const trailRef = useRef([]);
  const requestIdRef = useRef(null);
  const interactionTimerRef = useRef(500);
  const interactionCooldownRef = useRef(0);

  const stepSize = 0.5;
  const turnSpeed = 0.02;
  const trailFadeDuration = 5000;
  const trailFadeInterval = 16;
  const interactionSightDistance = 100;
  const interactionStopDistance = 25;

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
    if (isPaused) {
      requestIdRef.current = requestAnimationFrame(moveAgent);
      return;
    }
    
    if (interacting) {
      if (interactionTimerRef.current > 0) {
        updateSnails(snail.id, position, false);
        interactionTimerRef.current -= 1;
        updateTrail(position, color, false);
        requestIdRef.current = requestAnimationFrame(moveAgent);
        return;
      } else {
        setInteracting(false);
        interactionTimerRef.current = 500;
        interactionCooldownRef.current = 500;
        setTarget(getRandomTargetPosition());
      }
    }

    const prevPosition = position;
    const deltaX = target.x - prevPosition.x;
    const deltaY = target.y - prevPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance <= stepSize*2) {
      setTarget(getRandomTargetPosition());
    }

    const newDirection = {
      x: deltaX / distance,
      y: deltaY / distance,
    };

    const updatedDirection = {
      x: lerp(direction.x, newDirection.x, turnSpeed),
      y: lerp(direction.y, newDirection.y, turnSpeed),
    };

    const newPosition = {
      x: prevPosition.x + updatedDirection.x * stepSize,
      y: prevPosition.y + updatedDirection.y * stepSize,
    };

    const targetRotation = Math.atan2(updatedDirection.y, updatedDirection.x) * (180 / Math.PI);

    updateTrail(prevPosition, color, true);

    setPosition(newPosition);
    setRotation(targetRotation);
    setDirection(updatedDirection);
    updateSnails(snail.id, newPosition, available);

    if (interactionCooldownRef.current > 0) interactionCooldownRef.current -= 1;
    if (!interacting && interactionCooldownRef.current === 0) {
      setAvailable(true);
      seekInteraction(newPosition);
    }

    requestIdRef.current = requestAnimationFrame(moveAgent);
  };

  function seekInteraction(newPosition) {
    const { x: thisX, y: thisY } = newPosition;
    Object.values(snails).forEach((otherSnail) => {
      if (!otherSnail.position || otherSnail.name === name || !otherSnail.available) return;
      const { x: otherX, y: otherY } = otherSnail.position;
      const distanceToOther = calculateDistance(thisX, thisY, otherX, otherY);

      if (distanceToOther <= interactionSightDistance) {
        setTarget(otherSnail.position);
      }

      if (distanceToOther <= interactionStopDistance) {
        setInteracting(true);
        setAvailable(false);
        if (snail.name > otherSnail.name) initInteraction(snail, otherSnail);
      }
    });
  }

  function calculateDistance(x1, y1, x2, y2) {
    const deltaX = Math.abs(x2 - x1);
    const deltaY = Math.abs(y2 - y1);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
  }

  const updateTrail = (position, color, moving) => {
    if (moving) trailRef.current.push({ position, color, opacity: 1, timestamp: Date.now() });

    const currentTime = Date.now();
    while (trailRef.current.length > 0 && currentTime - trailRef.current[0].timestamp > trailFadeDuration) {
      trailRef.current.shift();
    }
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
  }, [position, target, isPaused]);

  useEffect(() => {
    return () => {
      trailRef.current = [];
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      trailRef.current = trailRef.current.filter((segment) => segment.opacity > 0);
    }, trailFadeInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const lerp = (start, end, t) => {
    return (1 - t) * start + t * end;
  };

  return (
    <>
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
              opacity: 0.02,
              borderRadius: '50%',
              zIndex: index + 1,
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
          zIndex: trailRef.current.length + 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon
          icon="mdi:snail"
          color={color}
          width="30"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        {isHovered && <span style={{ whiteSpace: 'nowrap' }}>{name}</span>}
        {displayText && <span style={{ whiteSpace: 'nowrap' }}>{displayText}</span>}
      </div>
    </>
  );
};

export default Snail;
