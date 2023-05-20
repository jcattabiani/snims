import React, { useState } from 'react';
import '../styles.css';
import { Icon } from '@iconify/react';
import {  Dialog, DialogContent } from '@mui/material';
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
          <Icon icon="mdi:snail" />
        </div>
      )}

      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="xs" fullWidth>
        <DialogContent className="modal-content">
          <SnailForm />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default SnailButton;