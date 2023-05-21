import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Dialog, DialogContent } from '@mui/material';
import SnailForm from './SnailForm';

const SnailButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExpanded(false);
  };

  return (
    <div
      className={`expandable-button ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        <button className="create-button" onClick={openModal}>
          Create New Snail
        </button>
      ) : (
        <div className="icon-container">
          <Icon icon="mdi:snail" width="30"/>
        </div>
      )}

      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="xs" fullWidth>
        <DialogContent>
          <SnailForm onClose={closeModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SnailButton;